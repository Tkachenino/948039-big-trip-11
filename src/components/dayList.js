import {Component} from "@/utils.js";

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
