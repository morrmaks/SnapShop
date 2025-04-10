import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

type CategoryType = 'Neon Comfort' | 'Gravity Shelves' | 'Holo Shine' | 'Pixel Lounge' | 'Cyber Desks';
enum categorySelectors {
  'Neon Comfort' = 'card__category_comfort',
  'Gravity Shelves' = 'card__category_shelves',
  'Holo Shine' = 'card__category_shine',
  'Pixel Lounge' = 'card__category_lounge',
  'Cyber Desks' = 'card__category_desks'
}

interface ICard {
  category: CategoryType;
  image: string;
  title: string;
  text: string;
  price: number | null;
}

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

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
    this.setText(this._price, value ? `${value} тугриков` : 'Нет цены');
  }
}
