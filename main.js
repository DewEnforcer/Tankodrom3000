const sliderBox = document.querySelector(".slider_box");
const buttonNext = document.getElementById("seq_next");
const buttonPrev = document.getElementById("seq_prev");
const sectionDisplayBox = document.querySelector(".section_display_wrapper");
let interval = undefined;
let currentImageEl = undefined;
let generatedRadios = false;
let currentImage = 0;
const maxImages = 5;
const changeTime = 15000; //ms
const fadeTime = 500;
const fadeOutKeyframes = [{ opacity: 1 }, { opacity: 0 }];
const fadeInKeyframes = [{ opacity: 0 }, { opacity: 1 }];
const fadeTiming = {
  duration: fadeTime,
  iterations: 1,
};
const generateSectionDisplays = () => {
  if (generatedRadios) return;
  for (let i = 0; i <= maxImages; i++) {
    let radio = document.createElement("input");
    radio.type = "radio";
    radio.className = "radio_section";
    radio.id = "section_" + i;
    sectionDisplayBox.appendChild(radio);
    radio.addEventListener("click", handleSectionSwitch);
  }
  generatedRadios = true;
};
const managerSectionDisplay = () => {
  const radios = document.querySelectorAll(".radio_section");
  radios.forEach((element, index) => {
    let check = false;
    if (index === currentImage) check = true;
    element.checked = check;
  });
};
const nextImage = () => {
  if (currentImage >= maxImages) return (currentImage = 0);
  currentImage++;
};
const prevImage = () => {
  if (currentImage <= 0) return (currentImage = maxImages);
  currentImage--;
};
const removeImage = () => {
  if (typeof currentImageEl === "undefined") return;
  const removedItem = currentImageEl;
  removedItem.animate(fadeOutKeyframes, fadeTiming);
  setTimeout(() => {
    removedItem.remove();
  }, fadeTime);
};
const animateImage = () => {
  removeImage();
  managerSectionDisplay();
  const newImage = document.createElement("img");
  newImage.src = `./images/slider${currentImage}.jpg`;
  sliderBox.appendChild(newImage);
  newImage.animate(fadeInKeyframes, fadeTiming);
  currentImageEl = newImage;
};
const initInterval = () => {
  interval = setInterval(() => {
    nextImage();
    animateImage();
  }, changeTime);
};
const slideImages = () => {
  //initial init
  generateSectionDisplays();
  animateImage();
  //now set timer
  initInterval();
};

const handleNextImage = () => {
  if (typeof interval === "undefined") return;
  clearInterval(interval);
  nextImage();
  animateImage();
  initInterval();
};
const handlePrevImage = () => {
  if (typeof interval === "undefined") return;
  clearInterval(interval);
  prevImage();
  animateImage();
  initInterval();
};
const handleSectionSwitch = (ev) => {
  const targetSection = Number(ev.target.id.split("_")[1]);
  if (typeof interval === "undefined" || targetSection === currentImage) return;
  clearInterval(interval);
  currentImage = targetSection;
  animateImage();
  initInterval();
};
slideImages();
//event listeners
buttonNext.addEventListener("click", handleNextImage);
buttonPrev.addEventListener("click", handlePrevImage);
