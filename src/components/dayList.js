import {AbstractComponent as Component} from "@/components/abstractComponent.js";

export const createDayListTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export class DayList extends Component {
  getTemplate() {
    return createDayListTemplate();
  }
}
