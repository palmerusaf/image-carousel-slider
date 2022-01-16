import { pubsub } from "../pubsub";
import { makeDotNavField } from "../dot-nav-field/dot-nav-field";
import { makePictureWindow } from "../picture-window/picture-window";
import { IndexManager } from "./index-manager";

const documentPictures = document.querySelectorAll(".slide-image");
const indexSize = documentPictures.length;
const container = document.createElement("div");
document.body.appendChild(container);
container.classList = "container";
container.appendChild(makePictureWindow(documentPictures));
container.appendChild(makeDotNavField(indexSize));
IndexManager.initWithIndexSize(indexSize);
