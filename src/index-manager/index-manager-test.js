import { pubsub } from "../pubsub";
import { makeDotNavField } from "../dot-nav-field/dot-nav-field";
import { makePictureWindow } from "../picture-window/picture-window";
import { IndexManager } from "./index-manager";

const indexSize = document.querySelectorAll(".slide-image").length;
const container = document.createElement("div");
container.classList = "container";
container.appendChild(makeDotNavField(indexSize));
container.appendChild(makePictureWindow());
IndexManager.initWithIndexSize(indexSize);
document.body.appendChild(container);
