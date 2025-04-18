import { IEvents } from '../../types/base/EventBroker';
import { IContactsForm } from '../../types';
import { Form } from './Form';
import { ensureElement } from '../../utils/utils';

export class ContactsForm extends Form<IContactsForm>{
  protected _email: HTMLInputElement;
  protected _phone: HTMLInputElement;

  constructor(protected container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._email = ensureElement<HTMLInputElement>('.form__input[name=email]', container);
    this._phone = ensureElement<HTMLInputElement>('.form__input[name=phone]', container);
  }

  switchButtonState(text: string, val: boolean) {
    this.switchButton(this._submitButton, text, val);
  }

  set email(val: string) {
    this._email.value = val;
  }

  set phone(val: string) {
    this._phone.value = val;
  }
}
