import {Filter as FilterComponent} from "@/components/filter.js";
import {render, RenderPosition} from "@/utils/render.js";

export class FilterController {
  constructor(container) {
    this._container = container;
    this._filter = null;
  }

  render() {
    this._filter = new FilterComponent();
    render(this._container, this._filter, RenderPosition.AFTEREND);
  }
}
