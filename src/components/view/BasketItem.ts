import { IEvents } from '../../types/base/EventBroker';
import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { IBasketItem } from '../../types';

export class BasketItem extends Component<IBasketItem> {
	id: string;
	productId: string;
	protected _index: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _delete: HTMLButtonElement;

	constructor(container: HTMLElement, blockName: string, events: IEvents) {
		super(container);

		this._index = ensureElement<HTMLElement>(`.${blockName}-index`, container);
		this._title = ensureElement<HTMLElement>(`.${blockName}-title`, container);
		this._price = ensureElement<HTMLElement>(`.${blockName}-price`, container);
		this._delete = ensureElement<HTMLButtonElement>(
			`.${blockName}-delete`,
			container
		);

		this._delete.addEventListener('click', () => {
			events.emit('basket:removeItem', this);
		});
	}

	set index(val: number) {
		this.setText(this._index, val);
	}

	set title(val: string) {
		this.setText(this._title, val);
	}

	set price(val: string) {
		this.setText(this._price, `${val} тг`);
	}
}
