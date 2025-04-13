import './scss/styles.scss';

import { EventBroker } from './components/base/EventBroker';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ApiModel } from './components/model/ApiModel';
import { CatalogModel } from './components/model/CatalogModel';
import { BasketModel } from './components/model/BasketModel';
import { Page } from './components/view/Page';
import { Card } from './components/view/Card';
import { Modal } from './components/view/Modal';
import { Basket } from './components/view/Basket';
import { BasketItem } from './components/view/BasketItem';
import { FormOrder } from './components/view/FormOrder';
import { FormContacts } from './components/view/FormContacts';
import { Success } from './components/view/Success';
import { IBasketItem, ICard } from './types';

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

const page = new Page(document.body, events);
const modal = new Modal(modalTemplate, events);
const basket = new Basket(cloneTemplate(basketTemplate), 'basket', events);
const formOrder = new FormOrder(cloneTemplate(orderTemplate), events);
const formContacts = new FormContacts(cloneTemplate(contactsTemplate), events);
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
    previewCard.switchButtonText(true);
    const product = await api.addProductBasket(card);
    events.emit('basket:changed', product);
  } catch (err) {
    console.log(`Ошибка добавления товара в корзину: ${err}`);
  } finally {
    previewCard.switchButtonText(false);
  }
  modal.close();
});

events.on('basket:open', () => {
  // basket.total = basketModel.total;
  basket.items = basketModel.products.map((item, i) => {
    const basketItem = new BasketItem(cloneTemplate(basketItemTemplate), 'basket__item', events);
    basketItem.index = i + 1;
    return basketItem.render(item);
  });
  modal.render({
    content: basket.render({total: basketModel.total})
  })
});

events.on('basket:removeItem', (item: IBasketItem) => {
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
  modal.render({content: formOrder.render()});
});

events.on('modal:open', () => {
  page.locked = true;
});

events.on('modal:close', () => {
  page.locked = false;
});

events.on('success:close', () => {
  modal.close();
});
