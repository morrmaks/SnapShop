import { Model } from '../base/Model';
import { IOrder, PaymentMethods } from '../../types';

export class OrderModel extends Model<IOrder> {
  email: string = '';
  phone: string = '';
  payment: PaymentMethods;
  address: string = '';
  valid: boolean = false;
  errors: Partial<Record<keyof IOrder, string>> = {};


  errorsIsEmpty(): boolean {
    return Object.keys(this.errors).length === 0;
  }

  validateAddress() {
    const regExp = /^[а-яА-ЯёЁa-zA-Z0-9\s\/.,-]{7,}$/;

    if(!this.address) {
      this.errors.address = 'необходимо указать адрес доставки';
    } else if (!regExp.test(this.address)) {
      this.errors.address = 'необходимо указать верный адрес';
    } else {
      delete this.errors.address;
    }

    this.events.emit('formOrderErrors:change', { errors: this.errors, valid: this.errorsIsEmpty() });
  }

  validateEmail() {
    const regExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    if(!this.email) {
      this.errors.email = 'необходимо указать email';
    } else if (!regExp.test(this.email)) {
      this.errors.email = 'некорректный email';
    } else {
      delete this.errors.email;
    }

    this.events.emit('formContactsErrors:change', this.errors);
  }

  validatePhone() {
    const regExp = /(^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$)/;

    if(!this.phone) {
      this.errors.phone = 'Необходимо указать номер телефона';
    } else if (!regExp.test(this.phone)) {
      this.errors.phone = 'некорректный номер телефона';
    } else {
      delete this.errors.phone;
    }

    this.events.emit('formContactsErrors:change', this.errors);
  }
}
