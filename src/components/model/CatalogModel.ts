import { Model } from '../base/Model';
import { ICard } from '../../types';

export class CatalogModel extends Model<ICard[]> {
  products: ICard[] = [];

  setProducts(cards: ICard[]) {
    cards.forEach(card => this.products.push(card));
    this.emitChanges('products:changed', this.products);
  }
}
