import { IDeliveryForm, PaymentMethods } from '../../types';
import { OrderModel } from './OrderModel';

export class DeliveryModel extends OrderModel {
  payment: PaymentMethods = 'online';
  address: string = '';

  touched: Partial<Record<keyof IDeliveryForm, boolean>> = {
    // payment: false,
    address: false
  }

  validateAddress(value: string) {
    const regExp = /^[а-яА-ЯёЁa-zA-Z0-9\s\/.,-]+$/;
    this.address = value;
    this.touched.address = true;

    if(!this.address) {
      this.errors.address = 'необходимо указать адрес доставки';
    } else if (!regExp.test(this.address)) {
      this.errors.address = 'Адрес должен состоять только из букв, цифр и символов: / . , -';
    } else {
      delete this.errors.address;
    }

    this.updateFormValidity('deliveryFormErrors:change', this.touched);
  }

  reset() {
    super.reset();
    this.payment = 'online';
    this.address = '';
  }
}
