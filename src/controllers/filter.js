import FilterComponent from "@/components/filter.js";
import {render, RenderPosition} from "@/utils/render.js";
import {FilterType} from "@/const.js";

export default class FilterController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._activeFilterType = FilterType.EVERYTHING;
    this._filterComponent = null;

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    this._filterComponent = new FilterComponent();
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);
    render(this._container, this._filterComponent, RenderPosition.AFTEREND);
  }

  _onFilterChange(filterType) {
    this._pointsModel.setFilter(filterType);
  }
}
