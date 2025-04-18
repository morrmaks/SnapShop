import { IEvents } from '../../types/base/EventBroker';
import { IPage } from '../../types';
import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

export class Page extends Component<IPage> {
  protected _counter: HTMLElement;
  protected _catalog: HTMLElement;
  protected _wrapper: HTMLElement;
  protected _basket: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._counter = ensureElement<HTMLElement>('.header__basket-counter');
    this._catalog = ensureElement<HTMLElement>('.gallery');
    this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
    this._basket = ensureElement<HTMLElement>('.header__basket');

    this._basket.addEventListener('click', () => {
      this.events.emit('modal:openBasket');
    });
  }

  freeze() {
    const scrollY = window.scrollY;

    this.locked = true;
    this._wrapper.style.top = `-${scrollY}px`;
  }

  unfreeze() {
    const scrollY = parseInt(this._wrapper.style.top) * -1;

    this.locked = false;
    this._wrapper.style.top = '';
    window.scrollTo({ top: scrollY, behavior: 'auto' });
  }

  set counter(val: number) {
    this.setText(this._counter, val);
  }

  set catalog(items: HTMLElement[]) {
    this._catalog.replaceChildren(...items);
  }

  set locked(val: boolean) {
    if (val) {
      this._wrapper.classList.add('page__wrapper_locked');
    } else {
      this._wrapper.classList.remove('page__wrapper_locked');
    }
  }
}
