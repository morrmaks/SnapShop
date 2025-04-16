import './scss/styles.scss';

import { EventBroker } from './components/base/EventBroker';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ApiModel } from './components/model/ApiModel';
import { CatalogModel } from './components/model/CatalogModel';
import { BasketModel } from './components/model/BasketModel';
import { DeliveryModel } from './components/model/DeliveryModel';
import { ContactsModel } from './components/model/ContactsModel';
import { OrderModel } from './components/model/OrderModel';
import { Page } from './components/view/Page';
import { Card } from './components/view/Card';
import { Modal } from './components/view/Modal';
import { Basket } from './components/view/Basket';
import { BasketItem } from './components/view/BasketItem';
import { DeliveryForm } from './components/view/DeliveryForm';
import { ContactsForm } from './components/view/ContactsForm';
import { Success } from './components/view/Success';
import { IBasketItem, ICard, IDeliveryForm, IContactsForm, PaymentMethods } from './types';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

const modalTemplate = ensureElement<HTMLElement>('#modal-container')
const cardItemTemplate = ensureElement<HTMLTemplateElement>('#card-item');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketItemTemplate = ensureElement<HTMLTemplateElement>('#basket-item');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const events = new EventBroker();
const api = new ApiModel(SUPABASE_URL, SUPABASE_API_KEY);
const catalog = new CatalogModel([], events);
const basketModel = new BasketModel({}, events);
const deliveryModel = new DeliveryModel({}, events);
const contactsModel = new ContactsModel({}, events);
const orderModel = new OrderModel({}, events);

const page = new Page(document.body, events);
const modal = new Modal(modalTemplate, events);
const basket = new Basket(cloneTemplate(basketTemplate), 'basket', events);
const deliveryForm = new DeliveryForm(cloneTemplate(orderTemplate), events);
const formContacts = new ContactsForm(cloneTemplate(contactsTemplate), events);
const success = new Success(cloneTemplate(successTemplate), events);

async function initialazeApp() {
  try {
    const [products, basketList] = await api.initialCatalogAndBasket();
    catalog.setProducts(products);
    events.emit('basket:addItems', basketList);
  } catch (err) {
    console.log(`Ошибка загрузки данных: ${err}`);
  } finally {

  }
}

initialazeApp();

events.on('products:changed', (cards: ICard[]) => {
  page.catalog = cards.map(card => {
    const catalogCard = new Card(cloneTemplate(cardItemTemplate), 'card', {
      onClick: ()=> events.emit('catalog:selectCard', card)
    });
    return catalogCard.render(card);
  });
});

events.on('basket:addItems', (products: IBasketItem | IBasketItem[]) => {
  basketModel.addToBasket(products);
  page.counter = basketModel.products.length;
})

events.on('catalog:selectCard', (card: ICard) => {
  const previewCard = new Card(cloneTemplate(cardPreviewTemplate), 'card', {
    onClick: ()=> events.emit('product:toBasket', {previewCard, card})
  })
  modal.render({
    content: previewCard.render(card)
  })
})

events.on('product:toBasket', async ({previewCard, card}: {previewCard: Card, card: ICard}) => {
  try {
    previewCard.switchButton('Добавляется...', true);
    const product = await api.addProductBasket(card);
    events.emit('basket:addItems', product);
  } catch (err) {
    console.log(`Ошибка добавления товара в корзину: ${err}`);
  } finally {
    previewCard.switchButton('В корзину', false);
  }
  modal.close();
});

events.on('basket:open', () => {
  basket.items = basketModel.products.map((item, i) => {
    const basketItem = new BasketItem(cloneTemplate(basketItemTemplate), 'basket__item', events);
    basketItem.index = i + 1;
    return basketItem.render(item);
  });
  modal.render({
    content: basket.render({total: basketModel.total})
  })
});

events.on('basket:delete', (item: IBasketItem) => {
  try {
    api.deleteProductBasket(item);
    basketModel.removeFromBasket(item);
    basket.total = basketModel.total;
    page.counter = basketModel.products.length;
  } catch (err) {
    console.log(`Ошибка удаления товара из корзины: ${err}`);
  }
});

events.on('basket:order', () => {
  orderModel.items = basketModel.products.map(item => {return item.productId});
  orderModel.total = basketModel.total;
  console.log(deliveryModel);
  modal.render({content: deliveryForm.render(deliveryModel)});
});

events.on('modal:open', () => {
  page.locked = true;
});

events.on('modal:close', () => {
  page.locked = false;
});

events.on('address:change', (data: { field: keyof IDeliveryForm, value: string }) => {
  deliveryModel.validateAddress(data.value);
});

events.on('deliveryFormErrors:change', (data: { errors: Partial<IDeliveryForm>, valid: boolean }) => {
  deliveryForm.errors = Object.values(data.errors).join(',\n ');
  deliveryForm.valid = data.valid;
});

events.on('email:change', (data: { field: keyof IContactsForm, value: string }) => {
  contactsModel.validateEmail(data.value);
});

events.on('phone:change', (data: { field: keyof IContactsForm, value: string }) => {
  contactsModel.validatePhone(data.value);
});

events.on('contactsFormErrors:change', (data: { errors: Partial<IContactsForm>, valid: boolean }) => {
  formContacts.errors = Object.values(data.errors).join(',\n ');
  formContacts.valid = data.valid;
});

events.on('order:submit', () => {
  orderModel.reset();
  modal.render({content: formContacts.render(contactsModel)});
});

events.on('contacts:submit', () => {
  modal.render({content: success.render({ total: orderModel.total })});
});

events.on('success:close', () => {
  modal.close();
});
