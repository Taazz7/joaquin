const sliderContent = document.querySelector(".slider__content");
const slides = document.querySelectorAll(".slider__img");
const prevBtn = document.querySelector(".slider__btn--prev");
const nextBtn = document.querySelector(".slider__btn--next");

let index = 1;
let transitioning = false;

// Clonar primer y último slide
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

sliderContent.appendChild(firstClone);
sliderContent.insertBefore(lastClone, slides[0]);

// Ajustar posición inicial
const updatedSlides = document.querySelectorAll(".slider__img");
sliderContent.style.transform = `translateX(-${index * 100}%)`;

function moveToSlide(i) {
  if (transitioning) return;
  transitioning = true;

  index = i;
  sliderContent.style.transition = "transform 0.6s ease";
  sliderContent.style.transform = `translateX(-${index * 100}%)`;
}

sliderContent.addEventListener("transitionend", () => {
  transitioning = false;

  if (updatedSlides[index] === firstClone) {
    index = 1;
    sliderContent.style.transition = "none";
    sliderContent.style.transform = `translateX(-${index * 100}%)`;
  }

  if (updatedSlides[index] === lastClone) {
    index = updatedSlides.length - 2;
    sliderContent.style.transition = "none";
    sliderContent.style.transform = `translateX(-${index * 100}%)`;
  }
});

// Botones
nextBtn.addEventListener("click", () => {
  moveToSlide(index + 1);
});

prevBtn.addEventListener("click", () => {
  moveToSlide(index - 1);
});

// Auto-slide
setInterval(() => moveToSlide(index + 1), 4000);
