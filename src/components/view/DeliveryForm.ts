import { IEvents } from '../../types/base/EventBroker';
import { IDeliveryForm, PaymentMethods } from '../../types';
import { Form } from './Form';
import { ensureElement } from '../../utils/utils';

export class DeliveryForm extends Form<IDeliveryForm> {
	protected _paymentOnline: HTMLInputElement;
	protected _paymentCash: HTMLInputElement;
	protected _address: HTMLInputElement;

	constructor(
		protected container: HTMLFormElement,
		events: IEvents
	) {
		super(container, events);

		this._paymentOnline = ensureElement<HTMLInputElement>(
			'.order__input[value=online]',
			container
		);
		this._paymentCash = ensureElement<HTMLInputElement>(
			'.order__input[value=cash]',
			container
		);
		this._address = ensureElement<HTMLInputElement>(
			'.form__input[name=address]',
			container
		);
	}

	set address(val: string) {
		this._address.value = val;
	}

	set payment(val: PaymentMethods) {
		this._paymentOnline.checked = val === 'online';
		this._paymentCash.checked = val === 'cash';
	}
}
