import { makeDotNavField } from "./dot-nav-field";
import { pubsub } from "../pubsub";
document.body.style.background = "black";

pubsub.subscribe("changeActiveIndex", console.log);
document.body.appendChild(makeDotNavField(4));

// Previous button press test
const previousButton = document.createElement("button");
previousButton.textContent = "previous";
previousButton.addEventListener("click", () => {
  pubsub.publish("previousButtonPressed");
});
document.body.appendChild(previousButton);

// next button press test
const nextButton = document.createElement("button");
nextButton.textContent = "next";
nextButton.addEventListener("click", () => {
  pubsub.publish("nextButtonPressed");
});
document.body.appendChild(nextButton);
