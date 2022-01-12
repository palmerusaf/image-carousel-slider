import { makeDotNavField } from "./dot-nav-field";
import { pubsub } from "../pubsub";

pubsub.subscribe("changeActiveIndex", console.log);

const container = document.createElement("div");
container.classList = "container";

const pictureField = document.createElement("div");
pictureField.classList = "pictureField";
container.appendChild(makeDotNavField(4));

document.body.appendChild(container);

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
