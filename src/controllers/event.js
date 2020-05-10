import {Event as EventComponent} from "@/components/event.js";
import {EventEditor as EventEditorComponent} from "@/components/eventEditor.js";
import {render, replace, remove, RenderPosition} from "@/utils/render.js";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
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

  render(event) {
    const oldEventComponent = this._eventComponent;
    const oldEventEditCompontent = this._eventEditorComponent;

    this._eventComponent = new EventComponent(event);
    this._eventEditorComponent = new EventEditorComponent(event);

    this._eventComponent.setMoreInfoButtonHandler(() => {
      this._showMoreInfo();
      document.addEventListener(`keydown`, this._onEscKeyDowm);
    });


    this._eventEditorComponent.setSubmitFormHandler((evt) => {
      evt.preventDefault();
      this._eventEditorComponent.getData();

      this._hideMoreInfo();
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

    if (oldEventComponent && oldEventEditCompontent) {
      replace(this._eventComponent, oldEventComponent);
      replace(this._eventEditorComponent, oldEventEditCompontent);
    } else {
      render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
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
