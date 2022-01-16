import { makeDotNavField } from "./dot-nav-field/dot-nav-field";
import { makePictureWindow } from "./picture-window/picture-window";
import { IndexManager } from "./index-manager/index-manager";
import "./image-slider-style.scss";

const documentPictures = document.querySelectorAll(".slide-image");
const indexSize = documentPictures.length;
const imageSlider = document.querySelector(".image-slider");
imageSlider.appendChild(makePictureWindow(documentPictures));
imageSlider.appendChild(makeDotNavField(indexSize));
IndexManager.initWithIndexSize(indexSize);
