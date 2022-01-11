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
  return dot;
}
