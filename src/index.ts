import './scss/styles.scss';

import { EventBroker } from './components/base/EventBroker';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ApiModel } from './components/model/ApiModel';
import { Page } from './components/view/Page';
import { Modal } from './components/view/Modal';
import { Basket } from './components/view/Basket';
import { FormOrder } from './components/view/FormOrder';
import { FormContacts } from './components/view/FormContacts';
import { Success } from './components/view/Success';

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

const api = new ApiModel(SUPABASE_URL, SUPABASE_API_KEY);
const events = new EventBroker();

const page = new Page(document.body, events);
const modal = new Modal(modalTemplate, events);
const basket = new Basket(cloneTemplate(basketTemplate), 'basket', events);
const formOrder = new FormOrder(cloneTemplate(orderTemplate), events);
const formContacts = new FormContacts(cloneTemplate(contactsTemplate), events);
const success = new Success(cloneTemplate(successTemplate), events);

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







// 'https://larek-api.nomoreparties.co/content/weblarek';
// 'https://larek-api.nomoreparties.co/api/weblarek';
//
//
// function handleResponse(response: Response): Promise<object> {
//   if (response.ok) return response.json();
// else return response.json()
//   .then(data => Promise.reject(data.error ?? response.statusText));
// }
//
// fetch('https://larek-api.nomoreparties.co/api/weblarek/order', {
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   method: 'GET'
// })
//   .then(handleResponse)
//   .then(data => console.table(data.items));
//
