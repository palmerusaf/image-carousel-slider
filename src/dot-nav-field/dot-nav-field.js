export function makeDotNavField(numberOfDots) {
  const container = _makeContainer();
  for (let index = 0; index < numberOfDots; index++) {
    container.appendChild(_makeDot(index));
  }
  return container;
}
