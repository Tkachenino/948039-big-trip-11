import {AbstractComponent as Component} from "@/components/abstractComponent.js";

export const createTripCostTemplate = (date) => {
  const totalCost = date.reduce((accum, item) => {
    let totalOfferCost = 0;

    if (item.offer !== ``) {
      totalOfferCost = item.offer.reduce((acc, i) => {
        return acc + i.cost;
      }, 0);
    }

    return accum + item.ownPrice + totalOfferCost;
  }, 0);
  return (
    `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
  </p>`
  );
};

export class Cost extends Component {
  constructor(cost) {
    super();
    this._cost = cost;
  }

  getTemplate() {
    return createTripCostTemplate(this._cost);
  }
}
