import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../../types/base/EventBroker';

interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected _closeButton: HTMLButtonElement;
  protected _content: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
    this._content = ensureElement<HTMLElement>('.modal__content', container);

    this.handleClickEsc = this.handleClickEsc.bind(this);
    this.handleCloseEvent = this.handleCloseEvent.bind(this);
  }

  open() {
    this.container.classList.add('modal_active');

    document.addEventListener('keydown', this.handleClickEsc);
    this.container.addEventListener('click', this.handleCloseEvent);

    this.events.emit('modal:open');
  }

  close() {
    this.container.classList.remove('modal_active');

    this.content = null;

    document.removeEventListener('keydown', this.handleClickEsc);
    this.container.removeEventListener('click', this.handleCloseEvent);

    this.events.emit('modal:close');
  }

  handleClickEsc(evt: KeyboardEvent) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  handleCloseEvent(evt: MouseEvent) {
    const target = evt.target as HTMLElement;
    if (
      target.classList.contains('modal__close') ||
      target.classList.contains('modal__overlay')
    ) {
      this.close();
    }
  }

  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }
}
