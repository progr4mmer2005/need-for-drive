import '../styles/main.scss';

import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/swiper-bundle.css';

const button = document.querySelector('#burgerButton');
const menu = document.querySelector('#menu');
const sliderMenuOverlay = document.querySelector('#sliderMenuOverlay');
const burgerButtonMobile = document.querySelector('#burgerButtonMobile');

function onBurgerButtonPressed() {
  burgerButtonMobile.classList.toggle('burger-button--active');
  button.classList.toggle('burger-button--active');
  menu.classList.toggle('menu--active');
  sliderMenuOverlay.classList.toggle('slider__menu-overlay--active');
}

button.addEventListener('click', onBurgerButtonPressed);
burgerButtonMobile.addEventListener('click', onBurgerButtonPressed);

// Swiper
new Swiper('.swiper', {
  modules: [Autoplay, Navigation, Pagination],

  loop: true,
  speed: 700,

  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    hideOnClick: false,
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

// language toggle
document.addEventListener('DOMContentLoaded', () => {
  const languageButtons = document.querySelectorAll('.language-button');

  languageButtons.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.stopPropagation();

      const textSpan = btn.querySelector('.language-button__text');

      if (textSpan.textContent.trim() === 'Eng') {
        textSpan.textContent = 'Рус';
      } else {
        textSpan.textContent = 'Eng';
      }
    });
  });
});
