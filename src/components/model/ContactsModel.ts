import { PaymentMethods } from '../../types';
import { OrderModel } from './OrderModel';

export class ContactsModel extends OrderModel {
  email: string = '';
  phone: string = '';

  validateEmail(value: string) {
    const regExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    this.email = value;

    if(!this.email) {
      this.errors.email = 'необходимо указать email';
    } else if (!regExp.test(this.email)) {
      this.errors.email = 'некорректный email';
    } else {
      delete this.errors.email;
    }

    this.valid = this.errorsIsEmpty();
    this.events.emit('contactsFormErrors:change', { errors: this.errors, valid: this.valid });
  }

  validatePhone(value: string) {
    const regExp = /(^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$)/;
    this.phone = value;

    if(!this.phone) {
      this.errors.phone = 'необходимо указать номер телефона';
    } else if (!regExp.test(this.phone)) {
      this.errors.phone = 'некорректный номер телефона';
    } else {
      delete this.errors.phone;
    }

    this.valid = this.errorsIsEmpty();
    this.events.emit('contactsFormErrors:change', { errors: this.errors, valid: this.valid });
  }

  reset() {
    super.reset();
    this.email = '';
    this.phone = '';
  }
}
