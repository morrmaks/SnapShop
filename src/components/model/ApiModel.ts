import { Api } from '../base/Api';

interface IApiModel {
  getListProductCard: <T>() => Promise<T[]>
  addProductBasket: <T>(product: T[]) => Promise<T[]>
  getListProductBasket: <T>() => Promise<T[]>
}

export class ApiModel extends Api implements IApiModel {
  constructor(supabaseUrl: string, supabaseKey: string) {
    super(supabaseUrl, supabaseKey);
  }

  async getListProductCard<T>(): Promise<T[]> {
    const res = await this.supabase
      .from('products')
      .select('*')
      .order('created_at', {ascending: false});
    return this._processResponse<T[]>(res);
  }

  async addProductBasket<T>(product: T[]): Promise<T[]> {
    const res = await this.supabase
      .from('basket')
      .insert(product)
      .select();
    return this._processResponse<T[]>(res);
  }

  async getListProductBasket<T>(): Promise<T[]> {
    const res = await this.supabase
      .from('basket')
      .select('*')
      .order('created_at', {ascending: false});
    return this._processResponse<T[]>(res);
  }
}
