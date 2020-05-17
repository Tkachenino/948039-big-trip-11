import {formatTime, formatDateTime, getDiffTime} from "@/utils/common.js";
import {AbstractComponent as Component} from "@/components/abstractComponent.js";


const getOfferList = (offer) => {
  return offer
  .map((it) => {
    const {title, price} = it;
    return (
      `<li class="event__offer">
            <span class="event__offer-title">${title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${price}</span>
           </li>`
    );
  }).slice(0, 3).join(`\n`);
};

export const createPointEventTeplate = (trip) => {
  const {offer, event, destination, ownPrice, startDate, finishDate} = trip;
  const city = destination.name;
  const startTime = formatTime(startDate);
  const finishTime = formatTime(finishDate);
  const startDateTime = formatDateTime(startDate);
  const finishDateTime = formatDateTime(finishDate);
  const diffTime = getDiffTime(startDate, finishDate);

  const isMoveCheck = [`check-in`, `sightseeing`, `restaurant`].some((it) => it === event) ? `in` : `to`;
  const isOfferCheck = !!offer;
  const getUpperLetter = (events) => events[0].toUpperCase() + events.slice(1);

  return (
    `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${event}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${getUpperLetter(event)} ${isMoveCheck} ${city}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${startDateTime}T${startTime}">${startTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${finishDateTime}T${finishTime}">${finishTime}</time>
        </p>
        <p class="event__duration">${diffTime}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${ownPrice}</span>
      </p>
      ${isOfferCheck ?
      `<h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
          ${getOfferList(offer)}
          </ul>`
      : ``
    }
        <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};

export class Event extends Component {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createPointEventTeplate(this._event);
  }

  setMoreInfoButtonHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, handler);
  }
}
