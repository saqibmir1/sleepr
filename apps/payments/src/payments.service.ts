import { NOTIFICATIONS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe;
  constructor(private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE) private readonly notificationsService: ClientProxy
  ) {
    this.stripe = new Stripe(
      this.configService.getOrThrow('STRIPE_SECRET_KEY'), {
    }
    );
  }

  async createCharge(card: Stripe.PaymentMethodCreateParams.Card, amount: number) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card,
    })
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      payment_method: paymentMethod.id,
      confirm: true,
      currency: 'usd',
      payment_method_types: ['card'],
    })
    this.notificationsService.emit('notify_email', {
      email: 'test@example.com',
    })
    return paymentIntent
  }

}
