/* global L:readonly */
// site-nav

const navMain = document.querySelector(".main-nav");
const navToggle = document.querySelector(".main-nav__toggle");

navMain.classList.remove("main-nav--nojs");

navToggle.addEventListener("click", function () {
  if (navMain.classList.contains("main-nav--closed")) {
    navMain.classList.remove("main-nav--closed");
    navMain.classList.add("main-nav--opened");
  } else {
    navMain.classList.add("main-nav--closed");
    navMain.classList.remove("main-nav--opened");
  }
});

// Slider

const slide1 = document.querySelector(".slider__item--1");
const slide2 = document.querySelector(".slider__item--2");
const slide3 = document.querySelector(".slider__item--3");
const sliderButton1 = document.querySelector(
  ".slider__pagination-button:nth-child(1)"
);
const sliderButton2 = document.querySelector(
  ".slider__pagination-button:nth-child(2)"
);
const sliderButton3 = document.querySelector(
  ".slider__pagination-button:nth-child(3)"
);
const sliderButtonPrev = document.querySelector(".slider__prev-slide");
const sliderButtonNext = document.querySelector(".slider__next-slide");
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slider__item");
const buttons = document.querySelectorAll(".slider__pagination-button");
const sliderWrapper = document.querySelector(".promo__wrapper");

let slideCounter = 0;

const wrappers = ["promo__wrapper--flat-white", "promo__wrapper--lavender", "promo__wrapper--espresso"];

const wrapperMaker = (wrapper) => {
  sliderWrapper.classList.remove(wrappers[0], wrappers[1], wrappers[2])
  sliderWrapper.classList.add(wrappers[wrapper]);
}

sliderButtonNext.addEventListener("click", function () {
  ++slideCounter;
  if (slideCounter >= slides.length) {
    slides.forEach((slide) => {
      slide.classList.remove("slider__item--current");
    });

    buttons.forEach((button) => {
      button.classList.remove("slider__pagination-button--current");
    });

    slideCounter = 0;

    slides[slideCounter].classList.add("slider__item--current");
    buttons[slideCounter].classList.add("slider__pagination-button--current");
    wrapperMaker(slideCounter);
  } else {
    slides.forEach((slide) => {
      slide.classList.remove("slider__item--current");
    });

    buttons.forEach((button) => {
      button.classList.remove("slider__pagination-button--current");
    });

    slides[slideCounter].classList.add("slider__item--current");
    buttons[slideCounter].classList.add("slider__pagination-button--current");
    wrapperMaker(slideCounter);
  }
});

sliderButtonPrev.addEventListener("click", function () {
  --slideCounter;
  if (slideCounter < 0) {
    slides.forEach((slide) => {
      slide.classList.remove("slider__item--current");
    });

    buttons.forEach((button) => {
      button.classList.remove("slider__pagination-button--current");
    });

    slideCounter = slides.length - 1;

    slides[slideCounter].classList.add("slider__item--current");
    buttons[slideCounter].classList.add("slider__pagination-button--current");
    wrapperMaker(slideCounter);
  } else {
    slides.forEach((slide) => {
      slide.classList.remove("slider__item--current");
    });

    buttons.forEach((button) => {
      button.classList.remove("slider__pagination-button--current");
    });

    slides[slideCounter].classList.add("slider__item--current");
    buttons[slideCounter].classList.add("slider__pagination-button--current");
    wrapperMaker(slideCounter);
  }
});

sliderButton1.addEventListener("click", function (evt) {
  evt.preventDefault();
  slide1.classList.add("slider__item--current");
  slide2.classList.remove("slider__item--current");
  slide3.classList.remove("slider__item--current");
  sliderButton1.classList.add("slider__pagination-button--current");
  sliderButton2.classList.remove("slider__pagination-button--current");
  sliderButton3.classList.remove("slider__pagination-button--current");
  wrapperMaker(0);
});

sliderButton2.addEventListener("click", function (evt) {
  evt.preventDefault();
  slide1.classList.remove("slider__item--current");
  slide2.classList.add("slider__item--current");
  slide3.classList.remove("slider__item--current");
  sliderButton1.classList.remove("slider__pagination-button--current");
  sliderButton2.classList.add("slider__pagination-button--current");
  sliderButton3.classList.remove("slider__pagination-button--current");
  wrapperMaker(1);
});

sliderButton3.addEventListener("click", function (evt) {
  evt.preventDefault();
  slide1.classList.remove("slider__item--current");
  slide2.classList.remove("slider__item--current");
  slide3.classList.add("slider__item--current");
  sliderButton1.classList.remove("slider__pagination-button--current");
  sliderButton2.classList.remove("slider__pagination-button--current");
  sliderButton3.classList.add("slider__pagination-button--current");
  wrapperMaker(2);
});

// map

const map = L.map("map").setView(
  {
    lat: 59.96831,
    lng: 30.31748,
  },
  16
);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/map-pin.svg',
  iconSize: [38, 50],
  iconAnchor: [19, 50],
});

const mainPinMarker = L.marker(
  {
    lat: 59.96831,
    lng: 30.31748,
  },
  {
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

// modal login

const link = document.querySelector(".js-login");
const popup = document.querySelector(".modal");
const close = popup.querySelector(".modal__button--close");
const form = popup.querySelector("form");
const login = popup.querySelector("[name=login]");
const password = popup.querySelector("[name=password]");

let isStorageSupport = true;
let storage = "";

try {
  storage = localStorage.getItem("login");
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("modal--show");

  if (storage) {
    login.value = storage;
    password.focus();
  } else {
    login.focus();
  }
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal--show");
  popup.classList.remove("modal--error");
});

form.addEventListener("submit", function (evt) {
  if (!login.value || !password.value) {
    evt.preventDefault();
    popup.classList.remove("modal--error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal--error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("login", login.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();

    if (popup.classList.contains("modal--show")) {
      popup.classList.remove("modal--show");
      popup.classList.remove("modal--error");
    }
  }
});
