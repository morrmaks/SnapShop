import { PaymentMethods } from '../../types';
import { OrderModel } from './OrderModel';

export class DeliveryModel extends OrderModel {
  payment: PaymentMethods = 'online';
  address: string = '';

  validateAddress(value: string) {
    const regExp = /^[а-яА-ЯёЁa-zA-Z0-9\s\/.,-]{7,}$/;
    this.address = value;

    if(!this.address) {
      this.errors.address = 'необходимо указать адрес доставки';
    } else if (!regExp.test(this.address)) {
      this.errors.address = 'необходимо указать верный адрес';
    } else {
      delete this.errors.address;
    }

    this.valid = this.errorsIsEmpty();
    this.events.emit('deliveryFormErrors:change', { errors: this.errors, valid: this.valid });
  }

  reset() {
    super.reset();
    this.payment = 'online';
    this.address = '';
  }
}
