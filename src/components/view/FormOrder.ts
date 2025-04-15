import { IEvents } from '../../types/base/EventBroker';
import { IFormOrder, PaymentMethods } from '../../types';
import { Form } from './Form';
import { ensureElement } from '../../utils/utils';

export class FormOrder extends Form<IFormOrder>{
  protected _paymentOnline: HTMLInputElement;
  protected _paymentCash: HTMLInputElement;
  protected _address: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._paymentOnline = ensureElement<HTMLInputElement>('.order__input[value=online]', container);
    this._paymentCash = ensureElement<HTMLInputElement>('.order__input[value=cash]', container);
    this._address = ensureElement<HTMLInputElement>('.form__input[name=address]', container);
  }

  set address(value: string) {
    this._address.value = value;
  }

  set payment(value: PaymentMethods) {
    this._paymentOnline.checked = value === 'online';
    this._paymentCash.checked = value === 'cash';
  }
}
