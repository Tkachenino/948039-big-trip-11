import Component from "@/components/abstractComponent.js";
import {FilterType} from "@/const.js";

const createFilter = (filtersList) => {
  return Object.values(filtersList).map((filter) => {
    const isChecked = filter === `everything` ? `checked` : ``;
    return (
      `<div class="trip-filters__filter">
      <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${isChecked}>
      <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
    </div>`
    );
  }).join(`\n`);
};

const createMenuFilterTemplate = () => {
  return (
    `<form class="trip-filters" action="#" method="get">
    ${createFilter(FilterType)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
  );
};

export default class Filter extends Component {
  getTemplate() {
    return createMenuFilterTemplate();
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = evt.target.value;
      handler(filterName);
    });
  }
}
