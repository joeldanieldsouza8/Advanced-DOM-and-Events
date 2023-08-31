'use strict';

///////////////////////////////////////
// Modal window

const message = document.createElement('div');
const header = document.querySelector('.header');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  // prevent default behaviour of button
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Old way of doing it
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

// New way of doing it
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Page navigation

// Old way of doing it
/*
Note to self:
We can't use this method because it's not a good practice to add an event listener to each element.
Essentially, we are adding 3 event listeners to 3 elements which creates a copy of the same function 3 times. 
Overtime, this will slow down the performance of the page.
Especially, in a large scale application.
*/

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault(); // This will prevent the default behaviour of the link.

//     const id = this.getAttribute('href'); // This will return the href attribute of the link that was clicked.
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' }); // This will scroll smoothly to the section1 element.
//   });
// });

// New way of doing it
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  
  // Check where the event was triggered
  // console.log(e.target); // This will return the element that was clicked.

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href'); // This will return the href attribute of the link that was clicked.
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' }); // This will scroll smoothly to the section1 element.
  }
});

btnScrollTo.addEventListener('click', function (e) {
  // const s1coords = section1.getBoundingClientRect(); // This will return the coordinates of the section1 element.
  
  // Old way 1
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset); // This will scroll to the section1 element.

  // Old way 2
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset, // This will return the current position of the viewport.
  //   top: s1coords.top + window.pageYOffset, // This will return the current position of the viewport.
  //   behavior: 'smooth',
  // }); 

  // Modern way of doing it
  section1.scrollIntoView({ behavior: 'smooth' }); // This will scroll smoothly to the section1 element.
});

// Creating and inserting elements
message.classList.add('cookie-message');
message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;

// Inserting elements

/* 
Note to self:
We can't use prepend and append at the same time. 
If we use prepend, the message will be the first child of the header.
If we use append, the message will be the last child of the header.

*/

// header.prepend(message); // This will add the message as the first child of the header. In other words, it will be the first element in the header. Or at the very top of the page.
// header.append(message); // This will add the message as the last child of the header. In other words, it will be the last element in the header. Or at the very bottom of the page.
// header.append(message.cloneNode(true)); // This will add the message as the last child of the header. In other words, it will be the last element in the header. Or at the very bottom of the page.

header.before(message); // This will add the message as a sibling of the header. In other words, it will be the element before the header. Or at the very top of the page.
// header.after(message); // This will add the message as a sibling of the header. In other words, it will be the element after the header. Or at the very bottom of the page.

// Deleting elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove(); // This will remove the message element from the DOM.
    // message.parentElement.removeChild(message); // This will remove the message element from the DOM. This is the old way of doing it.
  });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.height); // This will return an empty string because we haven't set the height property yet.
// console.log(message.style.backgroundColor); // This will return the background color of the message element.

// console.log(getComputedStyle(message).color); // This will return the color of the message element.
// console.log(getComputedStyle(message).height); // This will return the height of the message element.

/*
Note to self:
The parseFloat() function parses a string and returns a floating point number.
*/
// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'; // This will increase the height of the message element by 30px.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Understanding how the DOM tree works

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   e.preventDefault(); // This will prevent the default behaviour of the link.

//   this.style.backgroundColor = randomColor(); // This will change the background color of the nav__links element.
//   console.log('LINK', e.target, e.currentTarget); // This will return the link that was clicked and the nav__links element.
//   console.log(e.currentTarget === this); // This will return true.
// });

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   e.preventDefault(); // This will prevent the default behaviour of the link.

//   this.style.backgroundColor = randomColor(); // This will change the background color of the nav__link element.
//   console.log('LINK', e.target, e.currentTarget); // This will return the link that was clicked and the nav__link element.
//   console.log(e.currentTarget === this); // This will return true.
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   e.preventDefault(); // This will prevent the default behaviour of the link.

//   this.style.backgroundColor = randomColor(); // This will change the background color of the nav element.
//   console.log('LINK', e.target, e.currentTarget); // This will return the link that was clicked and the nav element.
//   console.log(e.currentTarget === this); // This will return true.
// });
