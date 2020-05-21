import Offer from "@/models/offer.js";


const isOnline = () => {
  return window.navigator.onLine;
};


export default class ProviderOffer {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }
  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          const items = offers;

          this._store.setItem(0, items);

          return offers;
        });
    }

    const storeOffers = Object.values(this._store.getItems());
    storeOffers[0].forEach((i) => Object.assign({}, i));

    return Promise.resolve(Offer.parseOffers(storeOffers[0]));
  }
}
