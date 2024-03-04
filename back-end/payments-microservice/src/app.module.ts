import { ConfigModule, ConfigService } from '@nestjs/config';
import { forwardRef, Module } from '@nestjs/common';
import { PaypalPaymentModule } from './paypal/modules/paypal-payment.module';
import configurations from './configurations';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [configurations],
    }),
    PaypalPaymentModule.register({
      clientId: process.env.PAYPAL_CLIENT_ID,
      clientSecret: process.env.PAYPAL_CLIENT_SECRET,
      environment: process.env.PAYPAL_ENVIRONMENT as 'sandbox' | 'live',
    }),
    PaypalPaymentModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          ...configService.get('paypalModuleInterface'),
        };
      },
    }),
    //
    forwardRef(() => PaymentsModule),
  ],
})
export class AppModule {}
