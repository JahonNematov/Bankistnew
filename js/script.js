'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////
/// Add Cookie message

const header = document.querySelector('.header');
const message = document.createElement('div');

message.classList.add('cookie-message');
message.innerHTML = 'We use cookied for improved functionality and analytics.';
const buttonCookie = document.createElement('button');
buttonCookie.classList.add('btn', 'btn--close-cookie');
buttonCookie.innerHTML = 'Got it!';
message.appendChild(buttonCookie);
header.prepend(message);

/////////////////
//// Stick nav
const nav = document.querySelector('.nav');
const navFnc = function (entries, observe) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const navObserver = new IntersectionObserver(navFnc, {
  root: null,
  threshold: 0.2,
});

navObserver.observe(header);

///////////////////////////
//// Smooth navbar menues

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
//////////////////////////////
/////  Remove Cookie message

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

//////////////////
///// Scroll

const scrollBtn = document.querySelector('.btn--scroll-to');

scrollBtn.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////////////
///// Tabbed component

const tabBtn = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');
tabBtn.forEach((e, key) => {
  e.addEventListener('click', function (el) {
    for (let i = 0; i < tabBtn.length; i++) {
      tabBtn[i].classList.remove('operations__tab--active');
      tabContent[i].classList.remove('operations__content--active');
    }
    e.classList.add('operations__tab--active');
    tabContent[key].classList.add('operations__content--active');
  });
});

////////////////////////
/////// Reveal section

const allSections = document.querySelectorAll('.section');

const secFunc = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) entry.target.classList.remove('section--hidden');
  else entry.target.classList.add('section--hidden');
};

const secConf = {
  root: null,
  threshold: 0.15,
};

const secObserver = new IntersectionObserver(secFunc, secConf);

allSections.forEach(e => {
  secObserver.observe(e);
  // e.classList.add('section--hidden');
});

/////////////////////////////////////
//////// Slider

const slides = document.querySelectorAll('.slide');

const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

const dotContainer = document.querySelector('.dots');
let curSlide = 0;

const creatDots = function () {
  slides.forEach((e, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

creatDots();

const activeDots = function (slide) {
  document.querySelectorAll('.dots__dot').forEach((e, i) => {
    e.classList.remove('dots__dot--active');
  });

  document
    .querySelector(`.dots__dot[data-slide='${slide}']`)
    .classList.add('dots__dot--active');
};

const goToSlide = function (slide) {
  slides.forEach((e, i) => {
    e.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
  activeDots(slide);
};

goToSlide(0);

const prevSlide = function () {
  if (curSlide == 0) {
    curSlide = slides.length - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

const nextSlide = function () {
  if (curSlide == slides.length - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};

document.addEventListener('keydown', e => {
  if (e.key == 'ArrowLeft') prevSlide();
  if (e.key == 'ArrowRight') nextSlide();
});

btnLeft.addEventListener('click', prevSlide);
btnRight.addEventListener('click', nextSlide);

dotContainer.addEventListener('click', e => {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.getAttribute('data-slide');
    goToSlide(Number(slide));
  }
});
