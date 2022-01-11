import { pubsub } from "../pubsub";

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
  const dot = document.createElement("span");
  dot.classList = "dot-field__dot";
  dot.dataset.index = index;
  dot.addEventListener("click", (clickEvent) =>
    pubsub.publish("dotClicked", clickEvent.target.dataset.index)
  );
  return dot;
}

function _setSelectedDotClassToActive(indexOfSelectedDot) {
  const allDots = [...document.getElementsByClassName("dot-field__dot")];
  _removeActiveClassFromAllDots(allDots);
  allDots[indexOfSelectedDot].classList.add("dot-field__dot--active");

  function _removeActiveClassFromAllDots(allDots) {
    allDots.forEach((dot) => dot.classList.remove("dot-field__dot--active"));
  }
}
pubsub.subscribe('dotClicked',_setSelectedDotClassToActive)