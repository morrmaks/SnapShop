import { Model } from '../base/Model';
import { IContactsForm, IDeliveryForm, IOrder, PaymentMethods } from '../../types';

export class OrderModel extends Model<IOrder>  {
  items: string[] = [];
  total: number | null = null;
  payment: PaymentMethods = 'online';
  address: string = '';
  email: string = '';
  phone: string = '';
  valid: boolean = false;
  errors: Partial<Record<keyof IOrder, string>> = {};

  errorsIsEmpty(): boolean {
    return Object.keys(this.errors).length === 0;
  }

  updateFormValidity(eventName: string, touched: Partial<Record<keyof IDeliveryForm | keyof IContactsForm, boolean>>) {
    const noErrors = this.errorsIsEmpty();
    const allFieldsTouched = Object.values(touched).every(Boolean);

    this.valid = noErrors && allFieldsTouched;
    this.events.emit(eventName, { errors: this.errors, valid: this.valid });
  }

  get orderData() {
    return {
      items: this.items,
      total: this.total,
      address: this.address,
      payment: this.payment,
      email: this.email,
      phone: this.phone,
    }
  }

  clearOrder() {
    this.items = [];
    this.total = null;
    this.payment = 'online';
    this.address = '';
    this.email = '';
    this.phone = '';
  }

  reset() {
    this.valid = false;
    this.errors = {};
  }
}
