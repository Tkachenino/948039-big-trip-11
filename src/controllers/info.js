import {Info as InfoComponent} from "@/components/info.js";
import {render, replace, RenderPosition} from "@/utils/render.js";

export class InfoController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._infoComponent = null;

    this._onDataInfoChange = this._onDataInfoChange.bind(this);

    this._pointsModel.setDataChangeHandler(this._onDataInfoChange);
  }

  render() {
    const container = this._container;
    const events = this._pointsModel;
    const oldComponent = this._infoComponent;

    this._infoComponent = new InfoComponent(events);
    if (oldComponent) {
      replace(this._infoComponent, oldComponent);
    } else {
      render(container, this._infoComponent, RenderPosition.AFTERBEGIN);
    }
  }

  _onDataInfoChange() {
    this.render();
  }
}
