import './scss/styles.scss';

import { EventBroker } from './components/base/EventBroker';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ApiModel } from './components/model/ApiModel';
import { CatalogModel } from './components/model/CatalogModel';
import { Page } from './components/view/Page';
import { Card } from './components/view/Card';
import { Modal } from './components/view/Modal';
import { Basket } from './components/view/Basket';
import { FormOrder } from './components/view/FormOrder';
import { FormContacts } from './components/view/FormContacts';
import { Success } from './components/view/Success';
import { ICard } from './types';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

// const modal = document.querySelectorAll('.modal')[1];
// document.querySelector('.gallery__item').addEventListener('click', (e) => {
//   modal.classList.add('modal_active');
// })

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
// const basketModel = new BasketModel();

const page = new Page(document.body, events);
const modal = new Modal(modalTemplate, events);
const basket = new Basket(cloneTemplate(basketTemplate), 'basket', events);
const formOrder = new FormOrder(cloneTemplate(orderTemplate), events);
const formContacts = new FormContacts(cloneTemplate(contactsTemplate), events);
const success = new Success(cloneTemplate(successTemplate), events);

async function initialazeApp() {
  try {
    const [products, basketList] = await api.initialCatalogAndBasket<ICard>();
    catalog.setProducts(products);
    console.log(products);
    console.log(basketList);
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

events.on('catalog:selectCard', (card: ICard) => {
  const previewCard = new Card(cloneTemplate(cardPreviewTemplate), 'card', {
    onClick: ()=> events.emit('card:toBasket', card)
  })
})

events.on('basket:order', () => {});

events.on('modal:open', () => {
  page.locked = true;
});

events.on('modal:close', () => {
  page.locked = false;
});

events.on('success:close', () => {
  modal.close();
});
