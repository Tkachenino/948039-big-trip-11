import Component from "@/components/abstractComponent.js";

const createEventPointListTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};

export default class EventList extends Component {
  getTemplate() {
    return createEventPointListTemplate();
  }
}
