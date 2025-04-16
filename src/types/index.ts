export interface IApiModel {
  getListProductCard: () => Promise<ICard[]>,
  getListProductBasket: () => Promise<IBasketItem[]>,
  addProductBasket:  (product: IBasketItem) => Promise<IBasketItem[]>,
  deleteProductBasket: (product: IBasketItem) => Promise<IBasketItem[]>
}

export interface IBasket {
  total: number | null;
  items: HTMLElement[];
}

export interface IBasketItem {
  id: string;
  title: string;
  price: number;
  productId?: string;
}

export type CategoryType =
  | 'Neon Comfort'
  | 'Gravity Shelves'
  | 'Holo Shine'
  | 'Pixel Lounge'
  | 'Cyber Desks';

export interface ICard {
  id: string;
  category: CategoryType;
  image: string;
  title: string;
  text: string;
  price: number | null;
}

export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export interface IFormValidation {
  valid: boolean;
  errors: Partial<Record<keyof IOrder, string>>
}

export type PaymentMethods = 'online' | 'cash';

export interface IContactsForm {
  email: string;
  phone: string;
}

export interface IDeliveryForm {
  payment: PaymentMethods;
  address: string;
}

export interface IModal {
  content: HTMLElement;
}

export interface IPage {
  counter: number;
  catalog: HTMLElement[];
  locked: boolean;
}

export interface ISuccess {
  total: number;
}

export type IOrder = IDeliveryForm & IContactsForm & IFormValidation;
