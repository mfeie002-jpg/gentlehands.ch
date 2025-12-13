import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertTriangle, ExternalLink, RefreshCw } from 'lucide-react';

interface SchemaValidationResult {
  type: string;
  isValid: boolean;
  errors: string[];
  warnings: string[];
  data?: Record<string, unknown>;
}

interface SchemaValidatorProps {
  className?: string;
}

export function SchemaValidator({ className }: SchemaValidatorProps) {
  const [results, setResults] = useState<SchemaValidationResult[]>([]);
  const [isValidating, setIsValidating] = useState(false);

  const validateSchemas = () => {
    setIsValidating(true);
    
    // Find all JSON-LD scripts in the document
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    const validationResults: SchemaValidationResult[] = [];
    
    scripts.forEach((script, index) => {
      try {
        const data = JSON.parse(script.textContent || '{}');
        const result = validateSchemaData(data);
        validationResults.push(result);
      } catch (e) {
        validationResults.push({
          type: `Schema #${index + 1}`,
          isValid: false,
          errors: ['Invalid JSON format'],
          warnings: [],
        });
      }
    });
    
    setResults(validationResults);
    setIsValidating(false);
  };

  const validateSchemaData = (data: Record<string, unknown>): SchemaValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];
    const type = (data['@type'] as string) || 'Unknown';
    
    // Required @context
    if (!data['@context']) {
      errors.push('Missing @context (should be "https://schema.org")');
    } else if (data['@context'] !== 'https://schema.org') {
      warnings.push('Non-standard @context');
    }
    
    // Required @type
    if (!data['@type']) {
      errors.push('Missing @type');
    }
    
    // Type-specific validation
    switch (type) {
      case 'LocalBusiness':
      case 'HealthAndBeautyBusiness':
        if (!data.name) errors.push('Missing name');
        if (!data.address) errors.push('Missing address');
        if (!data.telephone && !data.email) warnings.push('No contact info (telephone/email)');
        if (!data.image) warnings.push('Missing image');
        if (!data.openingHoursSpecification) warnings.push('Missing opening hours');
        break;
        
      case 'Product':
        if (!data.name) errors.push('Missing name');
        if (!data.offers) errors.push('Missing offers');
        if (data.offers && !(data.offers as Record<string, unknown>).price) {
          errors.push('Missing price in offers');
        }
        break;
        
      case 'FAQPage':
        if (!data.mainEntity || !Array.isArray(data.mainEntity)) {
          errors.push('Missing mainEntity array');
        }
        break;
        
      case 'BreadcrumbList':
        if (!data.itemListElement || !Array.isArray(data.itemListElement)) {
          errors.push('Missing itemListElement array');
        }
        break;
        
      case 'Review':
        if (!data.author) errors.push('Missing author');
        if (!data.reviewRating) errors.push('Missing reviewRating');
        break;
        
      case 'Service':
        if (!data.name) errors.push('Missing name');
        if (!data.provider) warnings.push('Missing provider');
        break;
        
      case 'WebPage':
        if (!data.name) warnings.push('Missing name');
        if (!data.description) warnings.push('Missing description');
        break;
    }
    
    return {
      type,
      isValid: errors.length === 0,
      errors,
      warnings,
      data,
    };
  };

  useEffect(() => {
    validateSchemas();
  }, []);

  const totalSchemas = results.length;
  const validSchemas = results.filter(r => r.isValid).length;
  const hasErrors = results.some(r => !r.isValid);
  const hasWarnings = results.some(r => r.warnings.length > 0);

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Schema.org Validierung</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={validateSchemas}
            disabled={isValidating}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isValidating ? 'animate-spin' : ''}`} />
            Prüfen
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {!hasErrors ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
            <span className="font-medium">
              {validSchemas}/{totalSchemas} Schemas valide
            </span>
          </div>
          {hasWarnings && (
            <Badge variant="outline" className="text-amber-600 border-amber-600">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Warnungen
            </Badge>
          )}
        </div>
        
        {/* Individual results */}
        <div className="space-y-3">
          {results.map((result, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg border ${
                result.isValid 
                  ? 'border-green-200 bg-green-50 dark:bg-green-950/20' 
                  : 'border-red-200 bg-red-50 dark:bg-red-950/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {result.isValid ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="font-medium">{result.type}</span>
                </div>
                <Badge variant={result.isValid ? 'default' : 'destructive'}>
                  {result.isValid ? 'Valide' : 'Fehler'}
                </Badge>
              </div>
              
              {result.errors.length > 0 && (
                <ul className="text-sm text-red-600 dark:text-red-400 space-y-1 mt-2">
                  {result.errors.map((error, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <XCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      {error}
                    </li>
                  ))}
                </ul>
              )}
              
              {result.warnings.length > 0 && (
                <ul className="text-sm text-amber-600 dark:text-amber-400 space-y-1 mt-2">
                  {result.warnings.map((warning, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      {warning}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        
        {/* External validation link */}
        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground mb-2">
            Für eine vollständige Validierung nutzen Sie Google's Rich Results Test:
          </p>
          <Button variant="outline" size="sm" asChild>
            <a 
              href="https://search.google.com/test/rich-results" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Google Rich Results Test
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
