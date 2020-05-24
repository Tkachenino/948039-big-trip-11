import Component from "@/components/abstract-component.js";

const createEventListTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};

export default class EventList extends Component {
  getTemplate() {
    return createEventListTemplate();
  }
}
