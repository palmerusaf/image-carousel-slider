import { pubsub } from "../pubsub";
import { IndexManager } from "../index-manager/index-manager";
import "./style.scss";

export function makeDotNavField(numberOfDots) {
  const container = _makeContainer();
  IndexManager.initWithIndexSize(numberOfDots);
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
  dot.addEventListener("click", (clickEvent) =>
    pubsub.publish("changeActiveIndex", clickEvent.target.dataset.index)
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
pubsub.subscribe("changeActiveIndex", _setSelectedDotClassToActive);

function _getNumberOfDots() {
  return document.getElementsByClassName("dot-field__dot").length;
}

function _getIndexOfActiveDot() {
  const activeDot = document.querySelector(".dot-field__dot--active");
  return activeDot.dataset.index;
}

function _cycleActiveIndexForward() {
  const activeDotIndex = +_getIndexOfActiveDot();
  const nextDotIndex = +_getIndexOfActiveDot() + 1;
  const lastDotIndex = +_getNumberOfDots() - 1;
  const firstDotIndex = 0;
  if (activeDotIndex === lastDotIndex) {
    pubsub.publish("changeActiveIndex", firstDotIndex);
  } else {
    pubsub.publish("changeActiveIndex", nextDotIndex);
  }
}
const FIVE_SECONDS = 5000;
let _cycleToNextIndexAtSetInterval = setInterval(
  _cycleActiveIndexForward,
  FIVE_SECONDS
);
pubsub.subscribe("nextButtonPressed", _cycleActiveIndexForward);

function _cycleActiveIndexBackward() {
  const activeDotIndex = +_getIndexOfActiveDot();
  const previousDotIndex = +_getIndexOfActiveDot() - 1;
  const lastDotIndex = +_getNumberOfDots() - 1;
  const firstDotIndex = 0;
  if (activeDotIndex === firstDotIndex) {
    pubsub.publish("changeActiveIndex", lastDotIndex);
  } else {
    pubsub.publish("changeActiveIndex", previousDotIndex);
  }
}
pubsub.subscribe("previousButtonPressed", _cycleActiveIndexBackward);

function _resetIntervalForCycleNextIndex() {
  clearInterval(_cycleToNextIndexAtSetInterval);
  _cycleToNextIndexAtSetInterval = setInterval(
    _cycleActiveIndexForward,
    FIVE_SECONDS
  );
}
pubsub.subscribe("changeActiveIndex", _resetIntervalForCycleNextIndex);
