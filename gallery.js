const PATH_TO_IMG = "./images/";
const mainWrapper = document.querySelector(".gallery_main_box");
let maxImgNum = 0;
let isOpen = false;
let boxPopup = undefined;
let opacityBoxGen = false;
let opaBox;
let currentImg = undefined;
let upscaledImg = undefined;
const popupWidth = 70;
const popupHeight = 70;
const duration = 500;
const getMaxImgNum = () => {
  if (maxImgNum > 0) return;
  const imageObj = new Image();
  let x;
  imageObj.onload = () => {
    maxImgNum++;
  };
  imageObj.onerror = () => {
    clearInterval(x);
    generatePreviews();
  };
  x = setInterval(() => {
    imageObj.src = `${PATH_TO_IMG}img${maxImgNum}.jpg`;
  });
};

const handleImageClick = (ev) => {
  opacityBox();
  if (!isOpen) {
    handleOpenImage(ev);
  } else {
    handleCloseImage();
  }
};

const displayUpscaledImg = (id = null) => {
  if (id != null) {
    id = Number(id);
    if (id === currentImg) return;
    currentImg = id;
  }
  if (typeof upscaledImg === "undefined") {
    upscaledImg = document.createElement("img");
    upscaledImg.src = `${PATH_TO_IMG}img${currentImg}.jpg`;
    upscaledImg.classList.add("image_upscaled");
    document.querySelector(".img_box").appendChild(upscaledImg);
    return;
  }
  upscaledImg.src = `${PATH_TO_IMG}img${currentImg}.jpg`;
};

const handleOpacityBoxSize = () => {
  opaBox.style.width = document.body.scrollWidth + "px";
  opaBox.style.height = document.body.scrollHeight + "px";
};
const opacityBox = () => {
  if (!opacityBoxGen) {
    opaBox = document.createElement("div");
    opaBox.classList.add("opacity_box");
    document.body.appendChild(opaBox);
    window.addEventListener("resize", handleOpacityBoxSize);
    handleOpacityBoxSize();
    opacityBoxGen = true;
  }
  let display = "block";
  if (isOpen) display = "none";
  opaBox.style.display = display;
};

const handleUpscaledNext = () => {
  if (currentImg + 1 >= maxImgNum) {
    currentImg = 0;
  } else {
    currentImg++;
  }
  displayUpscaledImg();
};
const handleUpscaledPrev = () => {
  if (currentImg <= 0) {
    currentImg = maxImgNum - 1;
  } else {
    currentImg--;
  }
  displayUpscaledImg();
};

const handleOpenImage = (ev) => {
  isOpen = true;
  const id = ev.currentTarget.id.split("_")[1];
  if (typeof boxPopup === "undefined") {
    boxPopup = document.createElement("div");
    boxPopup.classList.add("img_box");
    const closeButton = document.createElement("button");
    const forwards = document.createElement("button");
    const backwards = document.createElement("button");
    forwards.innerHTML = ">";
    forwards.value = "next";
    forwards.id = "next_btn";
    forwards.classList.add("btn_upscale");
    forwards.addEventListener("click", handleUpscaledNext);
    backwards.innerHTML = "<";
    backwards.value = "prev";
    backwards.id = "prev_btn";
    backwards.classList.add("btn_upscale");
    backwards.addEventListener("click", handleUpscaledPrev);
    closeButton.innerHTML = "&#10006";
    closeButton.id = "btn_close_popup";
    closeButton.addEventListener("click", handleImageClick);
    boxPopup.appendChild(forwards);
    boxPopup.appendChild(backwards);
    boxPopup.appendChild(closeButton);
    mainWrapper.appendChild(boxPopup);
  }
  displayUpscaledImg(id);
  boxPopup.style.display = "grid";
  boxPopup.animate(
    [
      {
        width: 0,
        height: 0,
      },
      {
        width: popupWidth + "vw",
        height: popupHeight + "vh",
      },
    ],
    {
      duration,
      iterations: 1,
    }
  );
  setTimeout(() => {
    boxPopup.style.width = popupWidth + "vw";
    boxPopup.style.height = popupHeight + "vh";
  }, duration - 50);
};

const handleCloseImage = () => {
  isOpen = false;
  boxPopup.animate(
    [
      {
        width: popupWidth + "vw",
        height: popupHeight + "vh",
      },
      {
        width: 0,
        height: 0,
      },
    ],
    {
      duration,
      iterations: 1,
    }
  );
  setTimeout(() => {
    boxPopup.style.width = 0;
    boxPopup.style.height = 0;
    boxPopup.style.display = "none";
  }, duration - 50); //shorten it by 10% otherwise the animation will look glitched out
};

const generatePreviews = () => {
  for (let i = 0; i < 20; i++) {
    //change the 20 to maxImgNum, and 0 in the img to i, this was changed to have more placeholders to work with
    let img = document.createElement("img");
    img.src = `${PATH_TO_IMG}img${0}.jpg`;
    img.id = "img_" + i;
    img.classList.add("img_standard");
    img.addEventListener("click", handleImageClick);
    mainWrapper.appendChild(img);
  }
};
getMaxImgNum();
