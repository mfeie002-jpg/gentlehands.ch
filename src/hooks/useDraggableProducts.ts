import { useState, useRef, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Position {
  x: number;
  y: number;
}

interface Product {
  id: string;
  position: Position;
  isFixed?: boolean;
}

interface UseDraggableProductsOptions {
  products: Product[];
  onPositionChange: (productId: string, newPosition: Position) => void;
  autoSaveDelay?: number;
}

export const useDraggableProducts = ({
  products,
  onPositionChange,
  autoSaveDelay = 1500
}: UseDraggableProductsOptions) => {
  const [draggingProduct, setDraggingProduct] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedStatus, setSavedStatus] = useState<"idle" | "saving" | "saved">("idle");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pendingChangesRef = useRef<Map<string, Position>>(new Map());

  // Debounced auto-save
  const scheduleAutoSave = useCallback(() => {
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }
    
    setHasUnsavedChanges(true);
    
    autoSaveTimerRef.current = setTimeout(async () => {
      if (pendingChangesRef.current.size === 0) return;
      
      setIsSaving(true);
      setSavedStatus("saving");
      
      try {
        const updates = Array.from(pendingChangesRef.current.entries());
        
        for (const [productId, position] of updates) {
          if (productId.startsWith("massage-table") || productId.startsWith("fixed-")) continue;
          
          const { error } = await supabase
            .from("room_setup_checklist")
            .update({
              position_x: Math.round(position.x * 100) / 100,
              position_y: Math.round(position.y * 100) / 100
            })
            .eq("id", productId);
            
          if (error) {
            console.error("Error saving position:", error);
          }
        }
        
        pendingChangesRef.current.clear();
        setHasUnsavedChanges(false);
        setSavedStatus("saved");
        
        // Reset saved status after animation
        setTimeout(() => setSavedStatus("idle"), 2000);
        
      } catch (error) {
        console.error("Auto-save error:", error);
        toast.error("Auto-Save fehlgeschlagen");
      } finally {
        setIsSaving(false);
      }
    }, autoSaveDelay);
  }, [autoSaveDelay]);

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent, product: Product) => {
    if (product.isFixed) return;
    
    e.preventDefault();
    setDraggingProduct(product.id);
    setIsDragging(true);
  }, []);

  const handleDragMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!draggingProduct || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    
    let clientX: number, clientY: number;
    
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    // Clamp values to stay within bounds
    const clampedX = Math.max(3, Math.min(97, x));
    const clampedY = Math.max(3, Math.min(97, y));
    
    const newPosition = { x: clampedX, y: clampedY };
    
    // Update local state immediately
    onPositionChange(draggingProduct, newPosition);
    
    // Queue for auto-save
    pendingChangesRef.current.set(draggingProduct, newPosition);
    scheduleAutoSave();
  }, [draggingProduct, onPositionChange, scheduleAutoSave]);

  const handleDragEnd = useCallback(() => {
    setDraggingProduct(null);
    setIsDragging(false);
  }, []);

  // Force save all pending changes
  const forceSave = useCallback(async () => {
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }
    
    if (pendingChangesRef.current.size === 0) return;
    
    setIsSaving(true);
    setSavedStatus("saving");
    
    try {
      const updates = Array.from(pendingChangesRef.current.entries());
      
      for (const [productId, position] of updates) {
        if (productId.startsWith("massage-table") || productId.startsWith("fixed-")) continue;
        
        await supabase
          .from("room_setup_checklist")
          .update({
            position_x: Math.round(position.x * 100) / 100,
            position_y: Math.round(position.y * 100) / 100
          })
          .eq("id", productId);
      }
      
      pendingChangesRef.current.clear();
      setHasUnsavedChanges(false);
      setSavedStatus("saved");
      toast.success("Positionen gespeichert!");
      
      setTimeout(() => setSavedStatus("idle"), 2000);
    } catch (error) {
      console.error("Force save error:", error);
      toast.error("Speichern fehlgeschlagen");
    } finally {
      setIsSaving(false);
    }
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, []);

  return {
    containerRef,
    draggingProduct,
    isDragging,
    hasUnsavedChanges,
    isSaving,
    savedStatus,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    forceSave
  };
};
