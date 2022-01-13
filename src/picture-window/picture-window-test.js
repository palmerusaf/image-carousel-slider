import { makePictureWindow } from "./picture-window";
import "../dot-nav-field/dot-nav-field-tests";

// initial styling of arrow button
const container = document.querySelector(".container");
container.prepend(makePictureWindow());
