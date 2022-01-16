export const pubsub = {
  events: {},
  subscribe: function (evName, fn) {
    this.events[evName] = this.events[evName] || [];
    this.events[evName].push(fn);
  },
  publish: function (evName, data) {
    if (this.events[evName]) {
      this.events[evName].forEach((f) => {
        f(data);
      });
    }
  },
};
