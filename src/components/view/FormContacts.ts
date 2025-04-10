import { Form } from './Form';
import { IEvents } from '../../types/base/EventBroker';
import { ensureElement } from '../../utils/utils';

interface IFormContacts {
  email: string;
  phone: string;
}

export class FormContacts extends Form<IFormContacts>{
  protected _email: HTMLInputElement;
  protected _phone: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._email = ensureElement<HTMLInputElement>('.form__input[name=email]', container);
    this._phone = ensureElement<HTMLInputElement>('.form__input[name=phone]', container);
  }

  set email(value: string) {
    this._email.value = value;
  }

  set phone(value: string) {
    this._phone.value = value;
  }
}
