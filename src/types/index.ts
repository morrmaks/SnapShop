export interface IBasket {
  total: number | null;
  items: HTMLElement[];
}

export interface IBasketItem {
  index: number;
  title: string;
  price: number;
}

export type CategoryType = 'Neon Comfort' | 'Gravity Shelves' | 'Holo Shine' | 'Pixel Lounge' | 'Cyber Desks';

export interface ICard {
  category: CategoryType;
  image: string;
  title: string;
  text: string;
  price: number | null;
}

export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export interface IForm {
  valid: boolean;
  // errors: Partial<>
}

export type PaymentMethods = 'online' | 'cash';

export interface IFormContacts {
  email: string;
  phone: string;
}

export interface IFormOrder {
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
