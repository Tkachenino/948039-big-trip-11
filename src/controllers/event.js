import EventComponent from "@/components/event.js";
import EventEditorComponent from "@/components/event-editor.js";
import {render, replace, remove, RenderPosition} from "@/utils/render.js";
import {NameMap} from "@/const.js";
import Point from "@/models/point.js";
import {getCheckedOffers} from "@/utils/common.js";


const SHAKE_ANIMATION_TIMEOUT = 600;

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const EmptyEvent = {
  event: `taxi`,
  destination: {
    name: ``,
  },
  ownPrice: ``,
  offer: [],
  startDate: ``,
  finishDate: ``,
  favoriteFlag: false,
  newEventFlag: true,
};


const parseFormData = (formData, OFFERS, DISTANTIONS) => {
  const startData = formData.get(`event-start-time`);
  const endData = formData.get(`event-end-time`);
  const destination = Object.assign({}, DISTANTIONS.find((distantion) => distantion.name === formData.get(`event-destination`)));

  return new Point({
    "base_price": Number(formData.get(`event-price`)),
    "date_from": new Date(startData),
    "date_to": new Date(endData),
    "destination": destination,
    "is_favorite": formData.get(`event-favorite`) === `on` ? false : true,
    "offers": getCheckedOffers(OFFERS, formData, NameMap),
    "type": formData.get(`event-type`),
  });
};

export default class EventController {
  constructor(container, onViewChange, onDataChange) {
    this._container = container;
    this._onViewChange = onViewChange;
    this._onDataChange = onDataChange;
    this._mode = Mode.DEFAULT;
    this._eventComponent = null;
    this._eventEditorComponent = null;

    this._onEscKeyDowm = this._onEscKeyDowm.bind(this);
  }

  render(event, mode, offers, destinations) {
    const oldEventComponent = this._eventComponent;
    const oldEventEditCompontent = this._eventEditorComponent;
    this._mode = mode;

    this._eventComponent = new EventComponent(event);
    this._eventEditorComponent = new EventEditorComponent(event, offers, destinations);

    this._eventComponent.setMoreInfoButtonHandler(() => {
      this._showMoreInfo();
      document.addEventListener(`keydown`, this._onEscKeyDowm);
    });


    this._eventEditorComponent.setSubmitFormHandler((evt) => {
      evt.preventDefault();
      this._eventEditorComponent.getElement().classList.remove(`red-shadow`);
      const formData = this._eventEditorComponent.getData();
      const data = parseFormData(formData, offers, destinations);

      this._eventEditorComponent.setData({
        saveButtonText: `Saving...`,
      });
      this._onDataChange(this, event, data);
      document.removeEventListener(`keydown`, this._onEscKeyDowm);
    });

    this._eventEditorComponent.setLessInfoButtonHandler(() => {
      this._hideMoreInfo();
      document.removeEventListener(`keydown`, this._onEscKeyDowm);
    });

    this._eventEditorComponent.setFavoriteHandler(() => {
      event.favoriteFlag = !event.favoriteFlag;
      this._onDataChange(this, event, event);
    });

    this._eventEditorComponent.setDeleteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._eventEditorComponent.setData({
        deleteButtonText: `Deleting...`,
      });
      this._onDataChange(this, event, null);
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEventComponent && oldEventEditCompontent) {
          replace(this._eventComponent, oldEventComponent);
          replace(this._eventEditorComponent, oldEventEditCompontent);
          this._hideMoreInfo();
        } else {
          render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldEventComponent && oldEventEditCompontent) {
          remove(oldEventComponent);
          remove(oldEventEditCompontent);
        }
        this._onViewChange();
        document.addEventListener(`keydown`, this._onEscKeyDowm);
        render(this._container, this._eventEditorComponent, RenderPosition.AFTEREND);
        break;
    }
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditorComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDowm);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {

      if (this._mode === Mode.ADDING) {
        document.querySelector(`#control__new-event`).disabled = false;
        this.destroy();
      }

      this._hideMoreInfo();
    }
  }

  shake() {
    this._eventEditorComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._eventComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._eventEditorComponent.getElement().style.animation = ``;
      this._eventComponent.getElement().style.animation = ``;

      this._eventEditorComponent.setData({
        saveButtonText: `Save`,
        deleteButtonText: `Delete`,
      });
      this._eventEditorComponent.setUnlockForm();
      document.addEventListener(`keydown`, this._onEscKeyDowm);
      this._eventEditorComponent.getElement().classList.add(`red-shadow`);

    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _showMoreInfo() {
    this._onViewChange();
    replace(this._eventEditorComponent, this._eventComponent);
    this._mode = Mode.EDIT;
  }

  _hideMoreInfo() {
    this._eventEditorComponent.reset();
    replace(this._eventComponent, this._eventEditorComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDowm(evt) {
    if (evt.key === `Escape`) {

      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyEvent, null);
      }

      this._hideMoreInfo();
      document.removeEventListener(`keydown`, this._onEscKeyDowm);
    }
  }
}
