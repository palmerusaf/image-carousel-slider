import { pubsub } from "../pubsub";

export const IndexManager = (() => {
  const FIVE_SECONDS = 5000;
  const firstIndex = 0;
  let indexes = undefined;
  let activeIndex = undefined;
  let lastIndex = undefined;

  let _cycleToNextIndexAtSetInterval = setInterval(
    _cycleActiveIndexForward,
    FIVE_SECONDS
  );

  pubsub.subscribe("changeActiveIndex", _setActiveIndex);
  pubsub.subscribe("changeActiveIndex", _resetIntervalForCycleNextIndex);
  pubsub.subscribe("nextButtonPressed", _cycleActiveIndexForward);
  pubsub.subscribe("previousButtonPressed", _cycleActiveIndexBackward);

  function initWithIndexSize(numberOfIndexes) {
    if (!indexes) {
      indexes = numberOfIndexes;
      activeIndex = 0;
      lastIndex = numberOfIndexes - 1;
      pubsub.publish("changeActiveIndex", activeIndex);
    } else console.error("Indexes already set in IndexManager module.");
  }

  function _setActiveIndex(index) {
    activeIndex = index;
  }

  function _cycleActiveIndexForward() {
    const nextIndex = activeIndex + 1;

    if (activeIndex === lastIndex) {
      pubsub.publish("changeActiveIndex", firstIndex);
    } else {
      pubsub.publish("changeActiveIndex", nextIndex);
    }
  }

  function _cycleActiveIndexBackward() {
    const previousIndex = activeIndex - 1;

    if (activeIndex === firstIndex) {
      pubsub.publish("changeActiveIndex", lastIndex);
    } else {
      pubsub.publish("changeActiveIndex", previousIndex);
    }
  }

  function _resetIntervalForCycleNextIndex() {
    clearInterval(_cycleToNextIndexAtSetInterval);
    _cycleToNextIndexAtSetInterval = setInterval(
      _cycleActiveIndexForward,
      FIVE_SECONDS
    );
  }

  return { initWithIndexSize };
})();
