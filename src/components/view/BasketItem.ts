import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

interface IBasketItem {
  index: number;
  title: string;
  price: number;
}

export class BasketItem extends Component<IBasketItem> {
  protected _index: HTMLElement;
  protected _title: HTMLElement;
  protected _price: HTMLElement;
  protected _delete: HTMLButtonElement;

  constructor(container: HTMLElement, blockName: string) {
    super(container);

    this._index = ensureElement<HTMLElement>(`.${blockName}-index`, container);
    this._title = ensureElement<HTMLElement>(`.${blockName}-title`, container);
    this._price = ensureElement<HTMLElement>(`.${blockName}-price`, container);
    this._delete = ensureElement<HTMLButtonElement>(`.${blockName}-delete`, container);

    this._delete.addEventListener('click', () => {
      this.container.remove();
    });
  }

  set index(value: number) {
    this.setText(this._index, value);
  }
}
