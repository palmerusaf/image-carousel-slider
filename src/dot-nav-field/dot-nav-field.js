import { pubsub } from "../pubsub";
import "./style.scss";

export function makeDotNavField(numberOfDots) {
  const container = _makeContainer();
  for (let index = 0; index < numberOfDots; index++) {
    container.appendChild(_makeDot(index));
  }
  return container;
}

function _makeContainer() {
  const container = document.createElement("div");
  container.classList = "dot-field";
  return container;
}

function _makeDot(index) {
  const dot = document.createElement("button");
  dot.classList = "dot-field__dot";
  dot.title = `Go to pic ${index + 1}`;
  dot.dataset.index = index;
  if (index === 0) dot.classList.add("dot-field__dot--active");
  dot.addEventListener("click", publishDotIndex);
  return dot;

  function publishDotIndex(clickEvent) {
    const dotIndex = clickEvent.target.dataset.index;
    pubsub.publish("changeActiveIndex", dotIndex);
  }
}

function _setSelectedDotClassToActive(indexOfSelectedDot) {
  const allDots = [...document.getElementsByClassName("dot-field__dot")];
  _removeActiveClassFromAllDots(allDots);
  const selectedDot = allDots.find(
    (dot) => dot.dataset.index == indexOfSelectedDot
  );
  selectedDot.classList.add("dot-field__dot--active");

  function _removeActiveClassFromAllDots(allDots) {
    allDots.forEach((dot) => dot.classList.remove("dot-field__dot--active"));
  }
}
pubsub.subscribe("changeActiveIndex", _setSelectedDotClassToActive);
