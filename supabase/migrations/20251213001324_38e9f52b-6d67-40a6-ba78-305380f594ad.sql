-- Create secure gift card redemption function
CREATE OR REPLACE FUNCTION public.redeem_gift_card(
  p_code text,
  p_amount numeric,
  p_booking_id uuid DEFAULT NULL
)
RETURNS TABLE(
  success boolean,
  new_balance numeric,
  message text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_gift_card RECORD;
  v_new_balance numeric;
BEGIN
  -- Find and lock the gift card
  SELECT * INTO v_gift_card
  FROM public.gift_cards
  WHERE code = p_code
  FOR UPDATE;
  
  -- Check if card exists
  IF v_gift_card.id IS NULL THEN
    RETURN QUERY SELECT false, 0::numeric, 'Gutscheincode nicht gefunden'::text;
    RETURN;
  END IF;
  
  -- Check if card is already redeemed
  IF v_gift_card.is_redeemed = true AND v_gift_card.remaining_balance <= 0 THEN
    RETURN QUERY SELECT false, 0::numeric, 'Gutschein wurde bereits vollständig eingelöst'::text;
    RETURN;
  END IF;
  
  -- Check if card is expired
  IF v_gift_card.expires_at IS NOT NULL AND v_gift_card.expires_at < now() THEN
    RETURN QUERY SELECT false, 0::numeric, 'Gutschein ist abgelaufen'::text;
    RETURN;
  END IF;
  
  -- Check if amount is valid
  IF p_amount <= 0 THEN
    RETURN QUERY SELECT false, v_gift_card.remaining_balance, 'Ungültiger Betrag'::text;
    RETURN;
  END IF;
  
  -- Check if sufficient balance
  IF p_amount > v_gift_card.remaining_balance THEN
    RETURN QUERY SELECT false, v_gift_card.remaining_balance, 'Unzureichendes Guthaben'::text;
    RETURN;
  END IF;
  
  -- Calculate new balance
  v_new_balance := v_gift_card.remaining_balance - p_amount;
  
  -- Update the gift card
  UPDATE public.gift_cards
  SET 
    remaining_balance = v_new_balance,
    is_redeemed = (v_new_balance <= 0)
  WHERE id = v_gift_card.id;
  
  -- Log the redemption activity
  PERFORM public.log_activity(
    'gift_card_redeemed',
    'gift_card',
    v_gift_card.id,
    jsonb_build_object(
      'amount', p_amount,
      'new_balance', v_new_balance,
      'booking_id', p_booking_id
    )
  );
  
  RETURN QUERY SELECT true, v_new_balance, 'Gutschein erfolgreich eingelöst'::text;
END;
$$;