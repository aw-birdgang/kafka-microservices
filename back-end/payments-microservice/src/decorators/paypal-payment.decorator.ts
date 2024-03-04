import { Inject } from '@nestjs/common';
import { PAYPAL_PAYMENT_SERVICE_INSTANCE_TOKEN } from '../constants/paypal-constants';

export interface PaypalDecorator {
  (
    target: Record<string, unknown>,
    key: string | symbol,
    index?: number | undefined,
  ): void;
}

export function InjectPaypal(): PaypalDecorator {
  return Inject(PAYPAL_PAYMENT_SERVICE_INSTANCE_TOKEN);
}
