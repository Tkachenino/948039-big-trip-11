import Destination from "@/models/destination.js";


const isOnline = () => {
  return window.navigator.onLine;
};


export default class ProviderDestination {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }
  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          const items = destinations;

          this._store.setItem(0, items);

          return destinations;
        });
    }

    const storeDestination = Object.values(this._store.getItems());

    return Promise.resolve(Destination.parseDestinations(storeDestination));
  }
}
