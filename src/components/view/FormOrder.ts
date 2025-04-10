import { Form } from './Form';
import { IEvents } from '../../types/base/EventBroker';
import { ensureElement } from '../../utils/utils';

type PaymentMethods = 'online' | 'cash';

interface IFormOrder {
  payment: PaymentMethods;
  address: string;
}

export class FormOrder extends Form<IFormOrder>{
  protected _paymentOnline: HTMLInputElement;
  protected _paymentCash: HTMLInputElement;
  protected _address: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._paymentOnline = ensureElement<HTMLInputElement>('.order__input[value=online]', container);
    this._paymentCash = ensureElement<HTMLInputElement>('.order__input[value=cash]', container);
    this._address = ensureElement<HTMLInputElement>('.form__input[name=address]', container);

    // this._paymentOnline.addEventListener('');
  }

  set address(value: string) {
    this._address.value = value;
  }

  set payment(value: PaymentMethods) {
    this._paymentOnline.checked = value === 'online';
    this._paymentCash.checked = value === 'cash';
  }
}
