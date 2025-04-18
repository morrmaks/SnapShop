import { CategoryType, ICard, ICardActions } from '../../types';
import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { categorySelectors } from '../../utils/constants';

export class Card extends Component<ICard> {
  protected _category: HTMLElement;
  protected _image: HTMLImageElement;
  protected _title: HTMLElement;
  protected _text: HTMLElement;
  protected _price: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, protected blockName: string, actions?: ICardActions) {
    super(container);

    this._category = ensureElement<HTMLElement>(`.${blockName}__category`, container);
    this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
    this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
    this._price = ensureElement<HTMLElement>(`.${blockName}__price`, container);
    this._text = container.querySelector(`.${blockName}__text`);
    this._button = container.querySelector(`.${blockName}__button`);

    if (this._button) {
      this._button.addEventListener('click', actions.onClick);
    } else {
      this.container.addEventListener('click', actions.onClick);
    }
  }

  switchButtonState(text: string, val: boolean) {
    this.switchButton(this._button, text, val);
  }

  set id(val: string) {
    this.container.dataset.id = val;
  }

  set category(val: CategoryType) {
    if (this._category) {
      this.setText(this._category, val);
      this._category.classList.add(categorySelectors[val]);
    }
  }

  set image(val: string) {
    if (this._image) {
      this.setImage(this._image, val, this.title);
    }
  }

  set title(val: string) {
    this.setText(this._title, val);
  }

  set text(val: string) {
    if (this._text) {
      this.setText(this._text, val);
    }
  }

  set price(val: number | null) {
    this.setText(this._price, val ? `${val} тугриков` : 'Цены нет, нет цены');
  }
}
