import { makeDotNavField } from "./dot-nav-field/dot-nav-field";
import { makePictureWindow } from "./picture-window/picture-window";
import { IndexManager } from "./index-manager/index-manager";
import "./image-slider-style.scss";

const documentPictures = document.querySelectorAll(".slide-image");
const imageSlider = document.querySelector(".image-slider");

if (documentPictures && imageSlider)
  makeImageSlider(documentPictures, imageSlider);

export function makeImageSlider(pictures, container) {
  const documentPictures =
    pictures || document.querySelectorAll(".slide-image");
  const indexSize = documentPictures.length;
  const imageSlider = container || document.querySelector(".image-slider");
  imageSlider.appendChild(makePictureWindow(documentPictures));
  imageSlider.appendChild(makeDotNavField(indexSize));
  IndexManager.initWithIndexSize(indexSize);
}
