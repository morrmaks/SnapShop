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
  protected _button: HTMLElement;

  constructor(container: HTMLElement, protected blockName: string, actions?: ICardActions) {
    super(container);

    this._category = ensureElement<HTMLElement>(`.${blockName}__category`, container);
    this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
    this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
    this._price = ensureElement<HTMLElement>(`.${blockName}__price`, container);
    this._text = ensureElement<HTMLElement>(`.${blockName}__text`, container);
    this._button = ensureElement<HTMLButtonElement>(`.${blockName}__button`, container);

    if (this._button) {
      this._button.addEventListener('click', actions.onClick);
    } else {
      this.container.addEventListener('click', actions.onClick);
    }
  }

  set category(value: CategoryType) {
    if (this._category) {
      this.setText(this._category, value);
      this._category.classList.add(categorySelectors[value]);
    }
  }

  set image(value: string) {
    if (this._image) {
      this.setImage(this._image, value, this.title);
    }
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  get title() {
    return this._title.textContent || '';
  }

  set text(value: string) {
    if (this._text) {
      this.setText(this._text, value);
    }
  }

  set price(value: number | null) {
    this.setText(this._price, value ? `${value} тугриков` : 'Цены нет, нет цены');
  }
}
