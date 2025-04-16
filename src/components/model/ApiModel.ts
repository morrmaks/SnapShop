import { Api } from '../base/Api';
import { IApiModel, IBasketItem, ICard } from '../../types';

export class ApiModel extends Api implements IApiModel {
  constructor(supabaseUrl: string, supabaseKey: string) {
    super(supabaseUrl, supabaseKey);
  }

  async initialCatalogAndBasket():Promise<[ICard[], IBasketItem[]]> {
    return await Promise.all([
      this.getListProductCard(),
      this.getListProductBasket()
    ]);
  }

  async getListProductCard(): Promise<ICard[]> {
    const res = await this.supabase
      .from('products')
      .select('*')
      .order('created_at', {ascending: true});
    return this._processResponse<ICard[]>(res);
  }

  async getListProductBasket(): Promise<IBasketItem[]> {
    const res = await this.supabase
      .from('basket')
      .select('*')
      .order('created_at', {ascending: true});
    return this._processResponse<IBasketItem[]>(res);
  }

  async addProductBasket(product: IBasketItem): Promise<IBasketItem[]> {
    const insertObject = {
      ...product,
      productId: product.id
    }
    delete insertObject.id;

    const res = await this.supabase
      .from('basket')
      .insert([insertObject])
      .select();
    return this._processResponse<IBasketItem[]>(res);
  }

  async deleteProductBasket(product: IBasketItem): Promise<IBasketItem[]> {
    const res = await this.supabase
      .from('basket')
      .delete()
      .eq('id', product.id);
    return this._processResponse<IBasketItem[]>(res);
  }

  // async addOrder(orderDetails)
}
