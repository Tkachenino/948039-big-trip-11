import Component from "@/components/abstractComponent.js";

const createDayListTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class DayList extends Component {
  getTemplate() {
    return createDayListTemplate();
  }
}
