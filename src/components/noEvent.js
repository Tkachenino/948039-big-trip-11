import {Component} from "@/utils.js";

const createNoEventTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export class NoEvent extends Component {
  getTemplate() {
    return createNoEventTemplate();
  }
}
