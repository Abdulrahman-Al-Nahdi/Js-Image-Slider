// catch html elements
let slidesList = Array.from(document.querySelectorAll(".slider-images img"));
let slideNumEle = document.querySelector(".slide-number");
let prevBtn = document.querySelector(".slider-images .slider-controls .prev");
let nextBtn = document.querySelector(".slider-images .slider-controls .next");
let bullets = Array.from(document.querySelectorAll(".bullets ul li"));

// main variable
let currentSlide = parseInt(localStorage.getItem("currentSlide")) || 1;

// trigger checker
theChecker();

// handle click on previous and next button
prevBtn.addEventListener("click", function () {
  if (!prevBtn.classList.contains("disabled")) {
    currentSlide--;
    localStorage.setItem("currentSlide", currentSlide);
    theChecker();
  }
});
nextBtn.addEventListener("click", function () {
  if (!nextBtn.classList.contains("disabled")) {
    currentSlide++;
    localStorage.setItem("currentSlide", currentSlide);
    theChecker();
  }
});
// handle click on bullets
bullets.forEach((bullet) => {
  bullet.addEventListener("click", function () {
    currentSlide = parseInt(bullet.getAttribute("data-slide"));
    localStorage.setItem("currentSlide", currentSlide);
    theChecker();
  });
});

// checker function
function theChecker() {
  slideNumEle.innerHTML = `slide ${currentSlide}`;

  // remove active from all element in slidesList + bullets
  slidesList.forEach((slide) => {
    slide.classList.remove("active");
  });
  bullets.forEach((bullet) => {
    bullet.classList.remove("active");
  });

  // add active class to current element
  slidesList[currentSlide - 1].classList.add("active");
  bullets[currentSlide - 1].classList.add("active");

  // add and remove disabled class
  if (currentSlide == 1) {
    prevBtn.classList.add("disabled");
  } else {
    prevBtn.classList.remove("disabled");
  }
  if (currentSlide == slidesList.length) {
    nextBtn.classList.add("disabled");
  } else {
    nextBtn.classList.remove("disabled");
  }
}
// auto change to the slides
let autoSlide;

function startAutoSlide() {
  autoSlide = setInterval(function () {
    if (currentSlide == slidesList.length) {
      currentSlide = 1;
    } else {
      currentSlide++;
    }
    localStorage.setItem("currentSlide", currentSlide);
    theChecker();
  }, 4000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}
// trigger start auto slide
startAutoSlide();

// stop on hover in slide
document
  .querySelector(".slider .slider-images")
  .addEventListener("mouseenter", stopAutoSlide);
// start on leave the slide
document
  .querySelector(".slider .slider-images")
  .addEventListener("mouseleave", startAutoSlide);
