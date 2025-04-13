import { IEvents } from '../../types/base/EventBroker';
import { IForm } from '../../types';
import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

export class Form<T> extends Component<IForm> {
  protected _submitButton: HTMLButtonElement;
  protected _errors: HTMLElement;

  constructor(container: HTMLFormElement, protected events: IEvents) {
    super(container);

    this._submitButton = ensureElement<HTMLButtonElement>('.button[type=submit]', container);
    this._errors = ensureElement<HTMLElement>('.form__errors', container);

    this.container.addEventListener('input', (evt) => {
      const target = evt.target as HTMLInputElement;
      const field = target.name as keyof T;
      const value = target.value;
      this.onInputChange(field, value);
    })
  }

  onInputChange(field: keyof T, value: string) {
    this.events.emit(`${String(field)}:change`, {field, value});
  }

  set valid(value: boolean) {
    this._submitButton.disabled = !value;
  }

  set errors(value: string) {
    this.setText(this._errors, value);
  }
}
