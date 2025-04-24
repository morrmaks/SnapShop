import { IEvents } from '../../types/base/EventBroker';
import { IBasket } from '../../types';
import { createElement, ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';

export class Basket extends Component<IBasket> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(
		container: HTMLElement,
		protected blockName: string,
		protected events: IEvents
	) {
		super(container);

		this._list = ensureElement<HTMLElement>(`.${blockName}__list`, container);
		this._total = ensureElement<HTMLElement>(`.${blockName}__price`, container);
		this._button = ensureElement<HTMLButtonElement>(
			`.${blockName}__button`,
			container
		);

		this._button.addEventListener('click', () => {
			this.events.emit('order:begin');
		});
	}

	set total(price: number) {
		this.setText(this._total, `${price} тугриков`);
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
			this._button.disabled = false;
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
			this._button.disabled = true;
		}
	}
}
