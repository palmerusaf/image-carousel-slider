import { pubsub } from "../pubsub";
import "./style.scss";
import arrow from "./forward-arrow.svg";

export function makePictureWindow() {
  const container = document.createElement("div");
  container.appendChild(_makeNavOverlay());
  container.appendChild(_getPicturesFromDocument());
  container.classList = "picture-window";
  return container;
}

function _makeNavOverlay() {
  const navOverlay = document.createElement("div");
  navOverlay.classList = "nav-overlay";

  const previousButton = _makeArrowButton();
  previousButton.classList = "nav-overlay__previous-button";
  previousButton.addEventListener("click", () =>
    pubsub.publish("previousButtonPressed")
  );

  const nextButton = _makeArrowButton();
  nextButton.classList = "nav-overlay__next-button";
  nextButton.addEventListener("click", () =>
    pubsub.publish("nextButtonPressed")
  );

  navOverlay.appendChild(previousButton);
  navOverlay.appendChild(nextButton);
  return navOverlay;
}

function _makeArrowButton() {
  const button = document.createElement("button");
  const arrowImg = document.createElement("img");
  arrowImg.src = arrow;
  button.appendChild(arrowImg);
  return button;
}

function _getPicturesFromDocument() {
  const documentPictures = [...document.querySelectorAll(".slide-image")];
  _addAttributesToPictures();
  const groupedPictures = document.createDocumentFragment();
  documentPictures.forEach((picture) => groupedPictures.appendChild(picture));
  return groupedPictures;

  function _addAttributesToPictures() {
    documentPictures.forEach((picture, index) => {
      picture.dataset.index = index;
      if (index === 0) picture.classList.add("picture-window__picture--active");
      picture.classList.add("picture-window__picture");
    });
  }
}

function _setSelectedImgClassToActive(indexOfSelectedImg) {
  const allImgs = [
    ...document.getElementsByClassName("picture-window__picture"),
  ];
  _removeActiveClassFromAllImgs(allImgs);
  allImgs[indexOfSelectedImg].classList.add("picture-window__picture--active");

  function _removeActiveClassFromAllImgs(allImgs) {
    allImgs.forEach((img) =>
      img.classList.remove("picture-window__picture--active")
    );
  }
}
pubsub.subscribe("changeActiveIndex", _setSelectedImgClassToActive);
