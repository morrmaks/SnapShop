import { OrderModel } from './OrderModel';
import { IContactsForm } from '../../types';

export class ContactsModel extends OrderModel {
  email: string = '';
  phone: string = '';

  touched: Partial<Record<keyof IContactsForm, boolean>> = {
    email: false,
    phone: false,
  }

  validateEmail(value: string) {
    const regExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    this.email = value;
    this.touched.email = true;

    if(!this.email) {
      this.errors.email = 'необходимо указать email';
    } else if (!regExp.test(this.email)) {
      this.errors.email = 'некорректный email';
    } else {
      delete this.errors.email;
    }

    this.updateFormValidity('contactsFormErrors:change', this.touched);
  }

  validatePhone(value: string) {
    const regExp = /(^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$)/;
    this.phone = value;
    this.touched.phone = true;

    if (!this.phone) {
      this.errors.phone = 'необходимо указать номер телефона';
    } else if (!regExp.test(this.phone)) {
      this.errors.phone = 'некорректный номер телефона';
    } else {
      delete this.errors.phone;
    }

    this.updateFormValidity('contactsFormErrors:change', this.touched);
  }

  reset() {
    super.reset();
    this.email = '';
    this.phone = '';
  }
}
