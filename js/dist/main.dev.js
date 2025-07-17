"use strict";

// Display main-menu:
var menuBtn = document.querySelector('.menu-btn');
var mainMenu = document.querySelector('.main-menu');
menuBtn.addEventListener('click', show);

function show(e) {
  e.preventDefault();
  mainMenu.classList.toggle('show');
  menuBtn.classList.toggle('active'); // Adding right menu to the main menu 

  var li = document.createElement('li');
  li.innerHTML = "<a href=\"#\">Connect Wallet</a>";
  li.classList.add('main-menu');
  mainMenu.appendChild(li); // Prevent scrolling when main-menu is shown

  if (mainMenu.classList.contains('show')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'block';
  }
}

; // Scroll Animation Observer

var observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions); // Observe all animation elements

document.addEventListener('DOMContentLoaded', function () {
  var animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
  animatedElements.forEach(function (el) {
    return observer.observe(el);
  });
}); // Button Ripple Effect

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn-ripple')) {
    var ripple = document.createElement('span');
    var rect = e.target.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    var x = e.clientX - rect.left - size / 2;
    var y = e.clientY - rect.top - size / 2;
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    e.target.appendChild(ripple);
    setTimeout(function () {
      ripple.remove();
    }, 600);
  }
}); // Parallax Effect

window.addEventListener('scroll', function () {
  var scrolled = window.pageYOffset;
  var parallaxElements = document.querySelectorAll('.parallax');
  parallaxElements.forEach(function (element) {
    var speed = element.dataset.speed || 0.5;
    var yPos = -(scrolled * speed);
    element.style.transform = "translateY(".concat(yPos, "px)");
  });
}); // Smooth Scroll for anchor links

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
}); // Loading Animation

window.addEventListener('load', function () {
  var loader = document.querySelector('.loader');

  if (loader) {
    loader.style.opacity = '0';
    setTimeout(function () {
      loader.style.display = 'none';
    }, 500);
  }
}); // Counter Animation

function animateCounter(element, target) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2000;
  var start = 0;
  var startTime = performance.now();

  function updateCounter(currentTime) {
    var elapsed = currentTime - startTime;
    var progress = Math.min(elapsed / duration, 1);
    var current = Math.floor(progress * target);
    element.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);
} // Animate counters when they come into view


var counterObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var counter = entry.target;
      var text = counter.textContent;
      var target = parseInt(text.replace(/[^0-9]/g, ''));

      if (target) {
        animateCounter(counter, target);
        counterObserver.unobserve(counter);
      }
    }
  });
}, {
  threshold: 0.5
}); // Observe counter elements

document.addEventListener('DOMContentLoaded', function () {
  var counters = document.querySelectorAll('.frame-text h1');
  counters.forEach(function (counter) {
    return counterObserver.observe(counter);
  });
});
//# sourceMappingURL=main.dev.js.map
