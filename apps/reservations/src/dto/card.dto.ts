import { IsCreditCard } from "class-validator";
import Stripe from "stripe";

export class CardDto {
    cvc?: string;
    exp_month?: number;
    exp_year?: number;

    @IsCreditCard()
    number?: string;

}