import Component from "@/components/abstract-component.js";

const createDayListTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class DayList extends Component {
  getTemplate() {
    return createDayListTemplate();
  }

  clear() {
    this.getElement().innerHTML = ``;
  }
}
