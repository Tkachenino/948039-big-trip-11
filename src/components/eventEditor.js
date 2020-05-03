import {getTime, getEditTimeDate} from "@/utils/common.js";
import {AbstractSmartComponent as SmartComponent} from "@/components/abstractSmartComponent.js";
import {EventTransferList, EventActivityList, CityList} from "@/mock/eventData.js";

const getSliderList = (data, event) => {
  return data
  .map((it, index) => {
    const IsChecked = (it === event) ? `checked` : ``;
    return (
      `<div class="event__type-item">
        <input id="event-type-${it.toLowerCase()}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${it.toLowerCase()}" ${IsChecked}>
        <label class="event__type-label  event__type-label--${it.toLowerCase()}" for="event-type-${it.toLowerCase()}-${index}">${it}</label>
      </div>`
    );
  }).join(`\n`);
};

const getCityList = (data) => {
  return data
  .map((it) => {
    return (
      `<option value="${it}"></option>`
    );
  }).join(`\n`);
};

const getOfferList = (data) => {
  if (data === ``) {
    return ``;
  }
  return data
  .map((it, index) => {
    return (
      `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${it.name}-${index}" type="checkbox" name="event-offer-${it.name}" checked>
        <label class="event__offer-label" for="event-offer-${it.name}-${index}">
          <span class="event__offer-title">${it.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${it.cost}</span>
        </label>
      </div>`
    );
  }).join(`\n`);
};

export const createFormEditorTemplate = (data) => {
  const {event, city, ownPrice, offer, startDate, finishDate, favoriteFlag} = data;

  const startTime = getTime(startDate);
  const finishTime = getTime(finishDate);
  const startDateTime = getEditTimeDate(startDate);
  const finishDateTime = getEditTimeDate(finishDate);

  const isFavorite = favoriteFlag ? `checked` : ``;
  const isMoveCheck = [`check-in`, `sightseeing`, `restaurant`].some((it) => it === event) ? `in` : `to`;
  const isOffer = offer !== `` ? true : false;
  const getUpperLetter = (events) => events[0].toUpperCase() + events.slice(1);


  return (
    `<form class="event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${event}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              ${getSliderList(EventTransferList, event)}

            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              ${getSliderList(EventActivityList, event)}

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${getUpperLetter(event)}  ${isMoveCheck}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${getCityList(CityList)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDateTime} ${startTime}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${finishDateTime} ${finishTime}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${ownPrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details">
        ${isOffer ? `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
          ${getOfferList(offer)}
          </div>
        </section>` : ``
    }
      </section>
    </form>`
  );
};

export class EventEditor extends SmartComponent {
  constructor(event) {
    super();
    this._event = event;
    this._favoriteHandler = null;
    this._sumbitHandler = null;
  }

  recoveryListener() {
    this.setFavoriteHandler(this._favoriteHandler);
    this.setSubmitFormHandler(this._sumbitHandler);
    this.setLessInfoButtonHandler(this._lessInfoHandler);
    this.setTypeEventHandler(this._typeEventHandler);
    this.setCityHandler(this._typeCityHandler);
  }

  getTemplate() {
    return createFormEditorTemplate(this._event);
  }

  setSubmitFormHandler(handler) {
    this.getElement()
    .addEventListener(`submit`, handler);

    this._sumbitHandler = handler;
  }

  setLessInfoButtonHandler(handler) {
    this.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, handler);

    this._lessInfoHandler = handler;
  }

  setFavoriteHandler(handler) {
    this.getElement()
    .querySelector(`.event__favorite-btn`)
    .addEventListener(`click`, handler);

    this._favoriteHandler = handler;
  }

  setTypeEventHandler(handler) {
    this.getElement()
    .querySelector(`.event__type-list`)
    .addEventListener(`change`, handler);

    this._typeEventHandler = handler;
  }

  setCityHandler(handler) {
    this.getElement()
    .querySelector(`.event__field-group`)
    .addEventListener(`change`, handler);

    this._typeCityHandler = handler;
  }
}
