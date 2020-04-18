import {Component} from "@/utils.js";

export const createEventPointListTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};

export class EventList extends Component {
  getTemplate() {
    return createEventPointListTemplate();
  }
}
