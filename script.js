"use strict";

const carousel = document.querySelector(".hero");
const slides = Array.from(carousel.querySelectorAll(".slide"));

const previous = carousel.querySelector(".previous");
const next = carousel.querySelector(".next");

const status = document.getElementById("carousel-status");
const caption = carousel.querySelector(".project-caption");

const projectName = document.getElementById("project-name");
const projectLocation = document.getElementById("project-location");

let currentSlide = 0;

function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
        const active = slideIndex === currentSlide;

        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
    });

    const activeSlide = slides[currentSlide];

    caption.hidden = !activeSlide.dataset.project;

    projectName.textContent = activeSlide.dataset.project || "";
    projectLocation.textContent = activeSlide.dataset.location || "";

    status.textContent = `Foto ${currentSlide + 1} de ${slides.length}`;
}

previous.addEventListener("click", () => {
    showSlide(currentSlide - 1);
});

next.addEventListener("click", () => {
    showSlide(currentSlide + 1);
});

carousel.addEventListener("keydown", (event) => {
    const isCarouselControl =
        event.target === carousel ||
        event.target === previous ||
        event.target === next;

    if (!isCarouselControl) return;

    if (event.key === "ArrowLeft") {
        event.preventDefault();
        showSlide(currentSlide - 1);
    }

    if (event.key === "ArrowRight") {
        event.preventDefault();
        showSlide(currentSlide + 1);
    }
});

showSlide(0);
