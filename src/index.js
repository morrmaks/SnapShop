import './scss/styles.scss';
const modal = document.querySelectorAll('.modal')[1];
document.querySelector('.gallery__item').addEventListener('click', (e) => {
    modal.classList.add('modal_active');
});
