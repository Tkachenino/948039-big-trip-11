import {Cost as CostComponent} from "@/components/cost.js";
import {render, replace, RenderPosition} from "@/utils/render.js";

export class CostController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._costComponent = null;

    this._onDataChange = this._onDataChange.bind(this);

    this._pointsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const events = this._pointsModel;
    const oldComponent = this._costComponent;

    this._costComponent = new CostComponent(events);
    if (oldComponent) {
      replace(this._costComponent, oldComponent);
    } else {
      render(container, this._costComponent, RenderPosition.BEFOREEND);
    }
  }

  _onDataChange() {
    this.render();
  }
}
