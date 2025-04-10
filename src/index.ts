import './scss/styles.scss';

import { EventBroker } from './components/base/EventBroker';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/view/Page';
import { Modal } from './components/view/Modal';
import { Basket } from './components/view/Basket';
import { FormOrder } from './components/view/FormOrder';
import { FormContacts } from './components/view/FormContacts';
import { Success } from './components/view/Success';
import { debug } from 'webpack';

// const modal = document.querySelectorAll('.modal')[1];
// document.querySelector('.gallery__item').addEventListener('click', (e) => {
//   modal.classList.add('modal_active');
// })

// const a = document.querySelector('.form[name=order]');
//
// a.addEventListener('input', (e) => {
//   const target = e.target as HTMLInputElement;
//   console.log(target.name, target.value);
// });

const modalTemplate = ensureElement<HTMLElement>('#modal-container')
const cardItemTemplate = ensureElement<HTMLTemplateElement>('#card-item');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketItemTemplate = ensureElement<HTMLTemplateElement>('#basket-item');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

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
