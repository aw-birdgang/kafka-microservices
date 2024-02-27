import { Injectable, Logger } from '@nestjs/common';
import { PaypalPaymentService } from '../paypal/services/paypal-payment.service';
import { CreatePaypalOrderDto } from '../dtos/paypal';

@Injectable()
export class PaymentsService {
  constructor(private readonly paypalPaymentService: PaypalPaymentService) {}

  private readonly logger = new Logger(PaymentsService.name);

  async initiateOrder() {
    this.logger.log(`initiateOrder `);

    const orderPayload: CreatePaypalOrderDto = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: '100.00',
          },
        },
      ],
    };
    const order = await this.paypalPaymentService.initiateOrder(orderPayload, {
      Prefer: 'return=representation',
    });
    return order;
  }
}
