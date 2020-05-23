import CostComponent from "@/components/cost.js";
import {render, replace, RenderPosition} from "@/utils/render.js";

export default class CostController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._costComponent = null;

    this._onDataCostChange = this._onDataCostChange.bind(this);

    this._pointsModel.setDataChangeHandler(this._onDataCostChange);
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

  _onDataCostChange() {
    this.render();
  }
}
