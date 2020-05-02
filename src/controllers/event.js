import {Event as EventComponent} from "@/components/event.js";
import {EventEditor as EventEditorComponent} from "@/components/eventEditor.js";
import {render, replace, RenderPosition} from "@/utils/render.js";

export class PointController {
  constructor(container) {
    this._container = container;
    this._eventComponent = null;
    this._eventEditorComponent = null;

    this._onEscKeyDowm = this._onEscKeyDowm.bind(this);
  }

  render(event) {
    this._eventComponent = new EventComponent(event);
    this._eventEditorComponent = new EventEditorComponent(event);

    this._eventComponent.setMoreInfoButtonHandler(() => {
      this._showMoreInfo();
      document.addEventListener(`keydown`, this._onEscKeyDowm);
    });


    this._eventEditorComponent.setSubmitFormHandler((evt) => {
      evt.preventDefault();
      this._hideMoreInfo();
      document.removeEventListener(`keydown`, this._onEscKeyDowm);
    });

    this._eventEditorComponent.setLessInfoButtonHandler(() => {
      this._hideMoreInfo();
      document.removeEventListener(`keydown`, this._onEscKeyDowm);
    });

    this._eventEditorComponent.setFavoriteHandler(() => {
      event.favoriteFlag = !event.favoriteFlag;
      this._eventEditorComponent.rerender();
    });

    this._eventEditorComponent.setTypeEventHandler((evt) => {
      const label = evt.target.value;
      event.event = label;
      this._eventEditorComponent.rerender();
    });

    this._eventEditorComponent.setCityHandler((evt) => {
      const city = evt.target.value;
      event.city = city;
      this._eventEditorComponent.rerender();
    });

    render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
  }

  _showMoreInfo() {
    replace(this._eventEditorComponent, this._eventComponent);
  }

  _hideMoreInfo() {
    replace(this._eventComponent, this._eventEditorComponent);
  }

  _onEscKeyDowm(evt) {
    if (evt.key === `Escape`) {
      this._hideMoreInfo();
      document.removeEventListener(`keydown`, this._onEscKeyDowm);
    }
  }
}
