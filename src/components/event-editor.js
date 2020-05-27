import SmartComponent from "@/components/abstract-smart-component.js";
import {EventTransferList, EventActivityList, NameMap} from "@/const.js";
import {getCheckedOffers} from "@/utils/common.js";

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const DefaultData = {
  deleteButtonText: `Delete`,
  saveButtonText: `Save`,
};


const getSliderList = (events, chosenEvent) => {
  return events
  .map((event, index) => {
    const IsChecked = (event === chosenEvent) ? `checked` : ``;
    return (
      `<div class="event__type-item">
        <input id="event-type-${event.toLowerCase()}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${event.toLowerCase()}" ${IsChecked}>
        <label class="event__type-label  event__type-label--${event.toLowerCase()}" for="event-type-${event.toLowerCase()}-${index}">${event}</label>
      </div>`
    );
  }).join(`\n`);
};

const getCityList = (cities) => {
  return cities
  .map((city) => {
    return (
      `<option value="${city}"></option>`
    );
  }).join(`\n`);
};

const getOfferList = (eventOffers, chosenOffers) => {
  let IsChecked = [];
  return eventOffers
  .map((eventOffer, index) => {
    if (chosenOffers === []) {
      IsChecked = false;
    } else {
      IsChecked = chosenOffers.some((chosenOffer) => JSON.stringify(chosenOffer) === JSON.stringify(eventOffer));
    }
    return (
      `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${NameMap[`${eventOffer.title}`]}-${index}" type="checkbox" name="event-offer-${NameMap[`${eventOffer.title}`]}" ${IsChecked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${NameMap[`${eventOffer.title}`]}-${index}">
          <span class="event__offer-title">${eventOffer.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${eventOffer.price}</span>
        </label>
      </div>`
    );
  }).join(`\n`);
};

const getPhotosList = (photos) => {
  return photos
  .map((photo) => {
    return (
      `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`
    );
  }).join(`\n`);
};

const createEventEditorTemplate = (data, allOffers, allDestinations, option = {}) => {
  const {favoriteFlag, newEventFlag} = data;
  const {eventType, eventCity, eventPrice, eventOffers, externalData} = option;

  const isDescription = (eventCity === ``) ? true : false;
  const cityList = allDestinations.map((distantion) => distantion.name);

  const indexCIty = !isDescription ? allDestinations.findIndex((destination) => destination.name === eventCity) : null;
  const description = !isDescription ? allDestinations[indexCIty].description : ``;
  const photos = !isDescription ? allDestinations[indexCIty].pictures : null;
  const IsPhotoCheck = !!photos;

  const indexOffer = allOffers.findIndex((offerIndex) => offerIndex.type === eventType);
  const allEventOffers = allOffers[indexOffer].offers;

  const isFavorite = favoriteFlag ? `checked` : ``;
  const isMoveCheck = [`check-in`, `sightseeing`, `restaurant`].some((place) => place === eventType) ? `in` : `to`;
  const isOffer = allEventOffers.length !== 0 ? true : false;

  const getUpperLetter = (word) => word[0].toUpperCase() + word.slice(1);

  const deleteButtonText = externalData.deleteButtonText;
  const saveButtonText = externalData.saveButtonText;

  return (
    `<form class="event  event--edit trip-events__item" action="#" method="post" autocomplete="off">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              ${getSliderList(EventTransferList, eventType)}

            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              ${getSliderList(EventActivityList, eventType)}

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${getUpperLetter(eventType)}  ${isMoveCheck}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${eventCity}" list="destination-list-1" required>
          <datalist id="destination-list-1">
            ${getCityList(cityList)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="" required>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="" required>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${eventPrice}" title="Введите целое число" pattern="^[ 0-9]+$">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">${saveButtonText}</button>
        <button class="event__reset-btn" type="reset">${deleteButtonText}</button>
        ${newEventFlag ? `` : `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>`}

        </header>
      <section class="event__details">
        ${isOffer ? `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
          ${getOfferList(allEventOffers, eventOffers)}
          </div>
        </section>` : ``
    }
      ${isDescription ? `` : `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      ${IsPhotoCheck ?
      `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${getPhotosList(photos)}
      </div>
  </div>` : ``}
  </section>`}

      </section>
    </form>`
  );
};

export default class EventEditor extends SmartComponent {
  constructor(event, offers, distantions) {
    super();

    this._offers = offers;
    this._distantions = distantions;
    this._event = event;
    this._favoriteHandler = null;
    this._sumbitHandler = null;
    this._deleteButtonClickHandler = null;
    this._externalData = DefaultData;

    this._eventType = event.event;
    this._eventCity = event.destination.name;
    this._eventPrice = event.ownPrice;
    this._eventStartData = event.startDate;
    this._eventEndData = event.finishDate;
    this._eventOffers = event.offer;

    this._flatpickrStart = null;
    this._flatpickrEnd = null;

    this._applyFlatpickr();

    this.setPriceHandler();
    this.setTypeEventHandler();
    this.setCityHandler();
    this.setCheckedOffersHandler();
  }

  removeElement() {
    if (this._flatpickrStart) {
      this._flatpickrStart.destroy();
      this._flatpickrStart = null;
    }

    if (this._flatpickrEnd) {
      this._flatpickrEnd.destroy();
      this._flatpickrEnd = null;
    }

    super.removeElement();
  }

  recoveryListener() {
    this.setFavoriteHandler(this._favoriteHandler);
    this.setSubmitFormHandler(this._sumbitHandler);
    this.setLessInfoButtonHandler(this._lessInfoHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this.setTypeEventHandler();
    this.setCityHandler();
    this.setPriceHandler();
    this.setCheckedOffersHandler();
  }

  getTemplate() {
    return createEventEditorTemplate(this._event, this._offers, this._distantions, {
      eventType: this._eventType,
      eventCity: this._eventCity,
      eventPrice: this._eventPrice,
      eventStartData: this._eventStartData,
      eventEndData: this._eventEndData,
      eventOffers: this._eventOffers,
      externalData: this._externalData,
    });
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultData, data);
    this.rerender();

    this.setDisabledForm();
  }

  setSubmitFormHandler(handler) {
    this.getElement()
    .addEventListener(`submit`, handler);
    this._sumbitHandler = handler;
    this. getData();
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement()
    .querySelector(`.event__reset-btn`)
    .addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }

  setLessInfoButtonHandler(handler) {
    const lesInfoButton = this.getElement().querySelector(`.event__rollup-btn`);

    if (lesInfoButton) {
      lesInfoButton.addEventListener(`click`, handler);
      this._lessInfoHandler = handler;
    }
  }

  setFavoriteHandler(handler) {
    const favoriteBtn = this.getElement().querySelector(`.event__favorite-btn`);

    if (favoriteBtn) {
      favoriteBtn.addEventListener(`click`, handler);
      this._favoriteHandler = handler;
    }
  }

  setPriceHandler() {
    this.getElement().querySelector(`.event__input--price`)
    .addEventListener(`change`, () => {
      const price = this.getElement().querySelector(`.event__input--price`).value;
      this._eventPrice = price;
    });
  }

  setTypeEventHandler() {
    this.getElement()
    .querySelector(`.event__type-list`)
    .addEventListener(`change`, (evt) => {
      const label = evt.target.value;
      this._eventType = label;
      this.rerender();
    });
  }

  setCityHandler() {
    const inputForCity = this.getElement().querySelector(`.event__input--destination`);

    inputForCity.onclick = () => {
      inputForCity.value = ``;
    };

    inputForCity.onkeypress = () => {
      return false;
    };

    if (this._distantions.map((distantion) => distantion.name).find((city) => city === inputForCity.value)) {
      inputForCity.setCustomValidity(``);
    } else {
      inputForCity.setCustomValidity(`Choose a city from the list`);
    }

    inputForCity.addEventListener(`change`, (evt) => {
      const city = evt.target.value;
      this._eventCity = city;
      this.rerender();
    });
  }

  setCheckedOffersHandler() {
    const offersField = this.getElement().querySelector(`.event__available-offers`);

    if (offersField) {
      offersField.addEventListener(`change`, (evt) => {
        if (evt.target.tagName === `INPUT`) {
          const checkedOffers = getCheckedOffers(this._offers, this.getData(), NameMap);
          this._eventOffers = checkedOffers;
        }
      });
    }
  }

  _applyFlatpickr() {
    if (this._flatpickrStart) {
      this._flatpickrStart.destroy();
      this._flatpickrStart = null;
    }

    if (this._flatpickrEnd) {
      this._flatpickrEnd.destroy();
      this._flatpickrEnd = null;
    }

    const dateStartElement = this.getElement().querySelector(`input[name=event-start-time]`);
    this._flatpickrStart = flatpickr(dateStartElement, {
      altInput: true,
      enableTime: true,
      allowInput: true,
      altFormat: `d/m/y H:i`,
      defaultDate: this._eventStartData,
      onClose: (selectedDates, dateStr) => {
        this._eventStartData = dateStr;
        this._flatpickrEnd.set(`minDate`, dateStr);
        this._flatpickrEnd.open();
      },
    });

    const dateEndElement = this.getElement().querySelector(`input[name=event-end-time]`);
    this._flatpickrEnd = flatpickr(dateEndElement, {
      altInput: true,
      enableTime: true,
      allowInput: true,
      altFormat: `d/m/y H:i`,
      minDate: this._eventStartData,
      defaultDate: this._eventEndData,
      onClose: (selectedDates, dateStr) => {
        this._eventEndData = dateStr;
      },
    });
  }

  reset() {
    const event = this._event;

    this._eventType = event.event;
    this._eventCity = event.destination.name;
    this._eventPrice = event.ownPrice;
    this._eventStartData = event.startDate;
    this._eventEndData = event.finishDate;
    this._eventOffers = event.offer;

    this.rerender();
  }

  getData() {
    const form = this.getElement();
    return new FormData(form);
  }

  setErrorStyle() {
    this.getElement().classList.add(`red-shadow`);
  }

  removeErrorStyle() {
    this.getElement().classList.remove(`red-shadow`);
  }

  setDisabledForm() {
    this.getElement().querySelectorAll(`input`).forEach((input) => {
      input.disabled = true;
    });
    this.getElement().querySelectorAll(`button`).forEach((button) => {
      button.disabled = true;
    });
  }

  setUnlockForm() {
    this.getElement().querySelectorAll(`input`).forEach((input) => {
      input.disabled = false;
    });
    this.getElement().querySelectorAll(`button`).forEach((button) => {
      button.disabled = false;
    });
  }
}
