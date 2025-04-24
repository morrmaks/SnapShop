import { Model } from '../base/Model';
import { IBasketItem } from '../../types';

export class BasketModel extends Model<IBasketItem> {
	products: IBasketItem[] = [];
	total: number | null;

	private getTotalBasketPrice(): number {
		return this.products.reduce(
			(sum: number, product: IBasketItem) => sum + product.price,
			0
		);
	}

	addToBasket(product: IBasketItem | IBasketItem[]) {
		if (Array.isArray(product)) {
			this.products.push(...product);
		} else {
			this.products.push(product);
		}
		this.total = this.getTotalBasketPrice();
	}

	removeFromBasket(product: IBasketItem) {
		this.products = this.products.filter((item) => item.id !== product.id);
		this.total = this.getTotalBasketPrice();
	}

	clearBasket() {
		this.products = [];
		this.total = this.getTotalBasketPrice();
	}
}
