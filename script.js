'use strict';

const message = document.createElement('div');
const header = document.querySelector('.header');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const allSections = document.querySelectorAll('.section');
const imgTargets = document.querySelectorAll('img[data-src]'); // This will return all the images with the data-src attribute.
const navHeight = nav.getBoundingClientRect().height; // This will return the height of the nav element.

///////////////////////////////////////
/// Modal window

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

///////////////////////////////////////
/// Menu fade animation

// const handleHover = function (e, opacity) {
//   /*
//   Note to self:
//   Here we use the closest() method to find the closest parent element with the nav__item class.
//   This is because there is a child element inside the nav__item element that we can hover over, which is the link element.
//   */
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target; // This will return the link that was hovered over.
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link'); // This will return all the links inside the nav element.
//     const logo = link.closest('.nav').querySelector('img'); // This will return the logo inside the nav element.

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = opacity; // This will change the opacity of all the links except the link that was hovered over.
//     });
//     logo.style.opacity = opacity; // This will change the opacity of the logo.
//   }
// };

// nav.addEventListener('mouseover', handleHover.bind(this, 0.5)); // This will change the opacity of the links and logo when the mouse is over the nav element.
// nav.addEventListener('mouseout', handleHover.bind(this, 1)); // This will change the opacity of the links and logo when the mouse is out of the nav element.

const handleHover = function (e) {
  /*
  Note to self:
  Here we use the closest() method to find the closest parent element with the nav__item class.
  This is because there is a child element inside the nav__item element that we can hover over, which is the link element.

  We use the 'this' keyword to pass the opacity value into the handler function.
  This is because we can't pass an argument into an event handler function.
  */

  // console.log(this, e.currentTarget);

  if (e.target.classList.contains('nav__link')) {
    const link = e.target; // This will return the link that was hovered over.
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); // This will return all the links inside the nav element.
    const logo = link.closest('.nav').querySelector('img'); // This will return the logo inside the nav element.

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this; // This will change the opacity of all the links except the link that was hovered over.
    });
    logo.style.opacity = this; // This will change the opacity of the logo.
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5)); // This will change the opacity of the links and logo when the mouse is over the nav element.
nav.addEventListener('mouseout', handleHover.bind(1)); // This will change the opacity of the links and logo when the mouse is out of the nav element.

///////////////////////////////////////
// Sticky navigation

//Old way
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY); // This will return the current position of the viewport.

//   if (this.window.scrollY > initialCoords.top)
//     nav.classList.add(
//       'sticky'
//     ); // This will add the sticky class to the nav element.
//   else nav.classList.remove('sticky'); // This will remove the sticky class from the nav element.
// });

// New way

const stickyNav = function (entries) {
  const [entry] = entries; // This will return the first element of the entries array.
  // console.log(entry);

  // This will add the sticky class to the nav element.
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  }

  // This will remove the sticky class from the nav element.
  else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // This will set the root element to the viewport.
  threshold: 0, // This will set the threshold to 0%.
  rootMargin: `-${navHeight}px`, // This will set the root margin to the height of the nav element.
});

headerObserver.observe(header); // This will observe the header element.

///////////////////////////////////////
/// Tabbed component
tabsContainer.addEventListener('click', function (e) {
  /*
  Note to self:
  Here we use the closest() method to find the closest parent element with the operations__tab class.
  This is because there is a child element inside the tab element that we can click on, which is the span element.
  */
  const clicked = e.target.closest('.operations__tab'); // This will return the closest parent element with the operations__tab class.

  // Guard clause
  if (!clicked) return; // This will return nothing if the clicked variable is null.

  // console.log(clicked);

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active')); // This will remove the active class from all the tabs.
  tabsContent.forEach(c => c.classList.remove('operations__content--active')); // This will remove the active class from all the tabs content.

  // Activate tab
  clicked.classList.add('operations__tab--active'); // This will add the active class to the clicked tab.

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active'); // This will add the active class to the content area of the clicked tab.
});

///////////////////////////////////////
// Reveal sections
const revealSection = function (entries, observer) {
  const [entry] = entries; // This will return the first element of the entries array.

  // Guard clause
  if (!entry.isIntersecting) return; // This will return nothing if the entry variable is null.

  entry.target.classList.remove('section--hidden'); // This will remove the hidden class from the section element.

  observer.unobserve(entry.target); // This will stop observing the section element.
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, // This will set the root element to the viewport.
  threshold: 0.15, // This will set the threshold to 15% within the viewport.
});

allSections.forEach(section => {
  /*
  Note to self:
    The observe method is called to start watching each section on the web page. It's essentially saying, "Hey, tell me when this section comes into the viewport (i.e., becomes visible on the screen)."
    In essence, sectionObserver.observe(section); tells the browser, "Watch this section and let me know when it comes into view according to the rules I've set (i.e., 15% of it is visible). 
    Once that happens, make it fully visible and stop watching it."
  */
  sectionObserver.observe(section);
  section.classList.add('section--hidden'); // This will add the hidden class to all the section elements.
});

///////////////////////////////////////
// Lazy loading images

const loadImg = function (entries, observer) {
  const [entry] = entries; // This will return the first element of the entries array.
  // console.log(entry);

  // Guard clause
  if (!entry.isIntersecting) return; // This will return nothing if the entry variable is null.

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src; // This will replace the src attribute with the data-src attribute.

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img'); // This will remove the lazy-img class from the image element once the actual image has been loaded.
  });

  observer.unobserve(entry.target); // This will stop observing the image element.
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null, // This will set the root element to the viewport.
  threshold: 0, // This will set the threshold to 0%.
  rootMargin: '200px', // This will set the root margin to 200px.
});

imgTargets.forEach(img => imgObserver.observe(img)); // This will observe all the images with the data-src attribute.

///////////////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSlide = slides.length;

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      // This will move the slides to the left.
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Previous slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    // console.log(e);

    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  // Dots
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      ); // This will create the dots. Specifies that the new button should be added just before the closing tag of dotContainer.
    });
  };

  dotContainer.addEventListener('click', function (e) {
    // console.log(e.target);

    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset; // This will return the value of the slide attribute.
      goToSlide(slide);
      activateDot(slide);
    }
  });

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active')); // This will remove the active class from all the dots.

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active'); // This will add the active class to the dot that was clicked.
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();
};

slider();

///////////////////////////////////////
/// Page navigation

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
///////////////////////////////////////

/// Message popup displayed
/* 
Note to self:
  This is useful only when the user tries to leave the page.
  For example, when the user is completing a form and tries to leave the page without submitting the form.
*/

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = ''; // This will display the message popup when the user tries to leave the page.
// });

///////////////////////////////////////
/// Creating and inserting elements
// message.classList.add('cookie-message');
// message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;

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

// header.before(message); // This will add the message as a sibling of the header. In other words, it will be the element before the header. Or at the very top of the page.
// header.after(message); // This will add the message as a sibling of the header. In other words, it will be the element after the header. Or at the very bottom of the page.

// Deleting elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove(); // This will remove the message element from the DOM.
//     // message.parentElement.removeChild(message); // This will remove the message element from the DOM. This is the old way of doing it.
//   });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////
/// Styles

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

///////////////////////////////////////
/// Understanding how the DOM tree works

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

///////////////////////////////////////
/// Traversing the DOM

const h1 = document.querySelector('h1');

// Going downwards: child
// console.log(h1.querySelectorAll('.highlight')); // This will return all the elements with the highlight class that are inside the h1 element.
// console.log(h1.childNodes); // This will return all the child nodes of the h1 element.
// console.log(h1.children); // This will return all the child elements of the h1 element.
// h1.firstElementChild.style.color = 'white'; // This will change the color of the first child element of the h1 element.
// h1.lastElementChild.style.color = 'orangered'; // This will change the color of the last child element of the h1 element.

// Going upwards: parents
// console.log(h1.parentNode); // This will return the parent node of the h1 element.
// console.log(h1.parentElement); // This will return the parent element of the h1 element.

/* 
Note to self:
The closest() method traverses the Element and its parents (heading toward the document root) until it finds a node that matches the provided selector string.
*/
// h1.closest('.header').style.background = 'var(--gradient-secondary)'; // This will change the background color of the header element.
// h1.closest('h1').style.background = 'var(--gradient-primary)'; // This will change the background color of the h1 element.

// Going sideways: siblings
// console.log(h1.previousElementSibling); // This will return the previous sibling element of the h1 element.
// console.log(h1.nextElementSibling); // This will return the next sibling element of the h1 element.

// console.log(h1.parentElement.children);

// Here we use the spread operator to convert the HTML collection into an array. Then we loop over the array and scale down all the elements inside the header element except the h1 element.
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)'; // This will scale down all the elements inside the header element except the h1 element.
// });
