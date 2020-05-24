import Component from "@/components/abstract-component.js";

const createCostTemplate = (data) => {
  const totalCost = data.reduce((accumulator, item) => {
    let totalOfferCost = 0;

    if (item.offer !== []) {
      totalOfferCost = item.offer.reduce((offerAccumulator, offerItem) => {
        return offerAccumulator + offerItem.price;
      }, 0);
    }
    return accumulator + item.ownPrice + totalOfferCost;
  }, 0);
  return (
    `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
  </p>`
  );
};

export default class Cost extends Component {
  constructor(pointsModel) {
    super();
    this._pointsModel = pointsModel;
  }

  getTemplate() {
    const events = this._pointsModel.getPoints();
    return createCostTemplate(events);
  }
}
