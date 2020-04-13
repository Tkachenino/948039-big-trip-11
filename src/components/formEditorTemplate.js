import {getTime, getEditTimeDate} from "@/util.js";
import {EventTransferList, EventActivityList, CityList} from "@/mock/trip.js";

const getSliderList = (data) => {
  return data
  .map((it, index) => {
    return (
      `<div class="event__type-item">
        <input id="event-type-${it.toLowerCase()}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${it.toLowerCase()}">
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
  return data
  .map((it, index) => {
    const chek = it.isChecked ? `checked` : ``;
    return (
      `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${it.name}-${index}" type="checkbox" name="event-offer-${it.name}" ${chek}>
        <label class="event__offer-label" for="event-offer-${it.name}-${index}">
          <span class="event__offer-title">${it.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${it.cost}</span>
        </label>
      </div>`
    );
  }).join(`\n`);
};

const getPhotoList = (data) => {
  return data
  .map((it) => {
    return (
      `<img class="event__photo" src="img/photos/${it}" alt="Event photo">`
    );
  }).join(`\n`);
};

export const createFormEditorTemplate = (trip) => {
  const {event, city, ownPrice, offer, photo, startDate, finishDate} = trip;

  const IsPhotoCheck = !!photo;

  const startTime = getTime(startDate);
  const finishTime = getTime(finishDate);
  const startDateTime = getEditTimeDate(startDate);
  const finishDateTime = getEditTimeDate(finishDate);


  const isMoveCheck = [`Check-in`, `Sightseeing`, `Restaurant`].some((it) => it === event) ? `in` : `to`;

  return (
    `
    <form class="trip-events__item  event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons//${event.toLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>

            ${getSliderList(EventTransferList)}

          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>

            ${getSliderList(EventActivityList)}

          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${event}  ${isMoveCheck}
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
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
         ${getOfferList(offer)}
          </div>
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>

        ${IsPhotoCheck ? `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${getPhotoList(photo)}
        </div>
      </div>` : ``}
      </section>
    </section>
  </form>
  `
  );
};
