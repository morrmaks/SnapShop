import { IEvents } from '../../types/base/EventBroker';
import { ISuccess } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';

export class Success extends Component<ISuccess>{
  protected _description: HTMLElement;
  protected _buttonClose: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._description = ensureElement<HTMLElement>('.modal__text', container);
    this._buttonClose = ensureElement<HTMLButtonElement>('.button_order-success_close', container);

    this._buttonClose.addEventListener('click', () => {
      this.events.emit('success:close');
    });
  }

  set total(val: number) {
    this.setText(this._description, `Списано ${val} тугриков`);
  }
}
