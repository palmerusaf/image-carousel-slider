import { pubsub } from "../pubsub";
import "./style.scss";
import arrow from "./forward-arrow.svg";

export function makePictureWindow() {
  const container = document.createElement("div");
  container.appendChild(_makeImageNavButtons());
  container.appendChild(_getPicturesFromDocument());
  container.classList = "picture-window";
  return container;
}

function _makeImageNavButtons() {
  const buttons = document.createDocumentFragment();

  const previousButton = _makeArrowButton();
  previousButton.classList = "picture-window__previous-button";
  previousButton.addEventListener("click", () =>
    pubsub.publish("previousButtonPressed")
  );

  const nextButton = _makeArrowButton();
  nextButton.classList = "picture-window__next-button";
  nextButton.addEventListener("click", () =>
    pubsub.publish("nextButtonPressed")
  );

  buttons.appendChild(previousButton);
  buttons.appendChild(nextButton);
  return buttons;
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
  documentPictures.classList.add("picture-window__picture");
  const groupedPictures = document.createDocumentFragment();
  documentPictures.forEach((picture) => groupedPictures.appendChild(picture));
  return groupedPictures;
}
