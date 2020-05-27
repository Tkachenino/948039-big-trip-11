import FilterComponent from "@/components/filter.js";
import {render, RenderPosition} from "@/utils/render.js";
import {FilterType} from "@/const.js";
import {getEventsByFilter} from "@/utils/filter.js";


export default class FilterController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._activeFilterType = FilterType.EVERYTHING;
    this._filterComponent = null;

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._pointsModel.setDataChangeHandler(this._onDataChange);
  }


  render() {
    this._filterComponent = new FilterComponent();
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);
    document.querySelector(`#control__new-event`).addEventListener(`click`, () => {
      this._onFilterChange(FilterType.EVERYTHING);
    });
    render(this._container, this._filterComponent, RenderPosition.AFTEREND);
  }

  _onFilterChange(filterType) {
    this._filterComponent.setActiveFilter(filterType);
    this._pointsModel.setFilter(filterType);
  }

  _onDataChange() {
    const AllPoints = this._pointsModel.getAllPoints();
    const types = Object.values(FilterType);
    types.forEach((type) => {
      if (getEventsByFilter(AllPoints, type).length === 0) {
        this._filterComponent.setDisabledType(type);
      } else {
        this._filterComponent.setActiveType(type);
      }
    });
  }
}
