import { pubsub } from "../pubsub";

export const IndexManager = (() => {
  const firstIndex = 0;
  let indexes = undefined;
  let activeIndex = undefined;
  let lastIndex = undefined;

  let _cycleIndexAtFiveSeconds = _executeEveryFiveSeconds(
    _cycleActiveIndexForward
  );

  pubsub.subscribe("changeActiveIndex", _setActiveIndex);
  pubsub.subscribe("changeActiveIndex", _resetIntervalForCycleNextIndex);
  pubsub.subscribe("nextButtonPressed", _cycleActiveIndexForward);
  pubsub.subscribe("previousButtonPressed", _cycleActiveIndexBackward);

  function initWithIndexSize(numberOfIndexes) {
    if (!indexes) {
      indexes = Number(numberOfIndexes);
      _setActiveIndex(0);
      lastIndex = Number(numberOfIndexes) - 1;
      pubsub.publish("changeActiveIndex", activeIndex);
    } else console.error("Indexes already set in IndexManager module.");
  }

  function _setActiveIndex(index) {
    activeIndex = Number(index);
  }

  function _cycleActiveIndexForward() {
    const nextIndex = Number(activeIndex) + 1;

    if (Number(activeIndex) === Number(lastIndex)) {
      pubsub.publish("changeActiveIndex", Number(firstIndex));
    } else {
      pubsub.publish("changeActiveIndex", Number(nextIndex));
    }
  }

  function _cycleActiveIndexBackward() {
    const previousIndex = Number(activeIndex) - 1;

    if (Number(activeIndex) === Number(firstIndex)) {
      pubsub.publish("changeActiveIndex", Number(lastIndex));
    } else {
      pubsub.publish("changeActiveIndex", Number(previousIndex));
    }
  }

  function _resetIntervalForCycleNextIndex() {
    clearInterval(_cycleIndexAtFiveSeconds);
    _cycleIndexAtFiveSeconds = _executeEveryFiveSeconds(
      _cycleActiveIndexForward
    );
  }

  function _executeEveryFiveSeconds(executable) {
    const FIVE_SECONDS = 5000;
    return setInterval(executable, FIVE_SECONDS);
  }

  return { initWithIndexSize };
})();
