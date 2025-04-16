import { Model } from '../base/Model';
import { IBasketItem, ICard, IOrder, PaymentMethods } from '../../types';

export class OrderModel extends Model<IOrder>  {
  items: string[] = [];
  total: number = 0;
  payment: PaymentMethods = 'online';
  address: string = '';
  email: string = '';
  phone: string = '';
  valid: boolean = false;
  errors: Partial<Record<keyof IOrder, string>> = {};

  errorsIsEmpty(): boolean {
    return Object.keys(this.errors).length === 0;
  }

  reset() {
    this.valid = false;
    this.errors = {};
  }
}
