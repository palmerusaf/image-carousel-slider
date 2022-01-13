import { _makeArrowButton } from "./picture-window";
import "../dot-nav-field/dot-nav-field-tests";

// initial styling of arrow button
const pictureField = document.querySelector(".pictureField");
pictureField.appendChild(_makeArrowButton());
