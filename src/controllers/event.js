import {Event as EventComponent} from "@/components/event.js";
import {EventEditor as EventEditorComponent} from "@/components/eventEditor.js";
import {render, replace, remove, RenderPosition} from "@/utils/render.js";

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const EmptyEvent = {
  event: `taxi`,
  city: `Amsterdam`,
  ownPrice: ``,
  offer: ``,
  startDate: ``,
  finishDate: ``,
  favoriteFlag: false,
};

export class PointController {
  constructor(container, onViewChange, onDataChange) {
    this._container = container;
    this._onViewChange = onViewChange;
    this._onDataChange = onDataChange;
    this._mode = Mode.DEFAULT;
    this._eventComponent = null;
    this._eventEditorComponent = null;

    this._onEscKeyDowm = this._onEscKeyDowm.bind(this);
  }

  render(event, mode) {
    const oldEventComponent = this._eventComponent;
    const oldEventEditCompontent = this._eventEditorComponent;
    this._mode = mode;

    this._eventComponent = new EventComponent(event);
    this._eventEditorComponent = new EventEditorComponent(event);

    this._eventComponent.setMoreInfoButtonHandler(() => {
      this._showMoreInfo();
      document.addEventListener(`keydown`, this._onEscKeyDowm);
    });


    this._eventEditorComponent.setSubmitFormHandler((evt) => {
      evt.preventDefault();
      const data = this._eventEditorComponent.getData();
      this._onDataChange(this, event, data);
      // this._hideMoreInfo();
      document.removeEventListener(`keydown`, this._onEscKeyDowm);
    });

    this._eventEditorComponent.setLessInfoButtonHandler(() => {
      this._hideMoreInfo();
      document.removeEventListener(`keydown`, this._onEscKeyDowm);
    });

    this._eventEditorComponent.setFavoriteHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        favoriteFlag: !event.favoriteFlag,
      }));
    });

    this._eventEditorComponent.setPriceHandler((evt) => {
      const price = evt.target.value;
      this._eventEditorComponent._eventPrice = price;
      this._eventEditorComponent.rerender();
    });

    this._eventEditorComponent.setDataStartHandler((evt) => {
      const dataStart = evt.target.value;
      this._eventEditorComponent._eventStartData = new Date(dataStart);
    });

    this._eventEditorComponent.setDataEndHandler((evt) => {
      const dataEnd = evt.target.value;
      this._eventEditorComponent._eventEndData = new Date(dataEnd);
    });

    this._eventEditorComponent.setTypeEventHandler((evt) => {
      const label = evt.target.value;
      this._eventEditorComponent._eventType = label;
      this._eventEditorComponent.rerender();
    });

    this._eventEditorComponent.setCityHandler((evt) => {
      const city = evt.target.value;
      this._eventEditorComponent._eventCity = city;
      this._eventEditorComponent.rerender();
    });

    this._eventEditorComponent.setDeleteButtonClickHandler((evt) => {
      evt.preventDefault();
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

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._hideMoreInfo();
    }
  }
}
