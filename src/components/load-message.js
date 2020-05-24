import Component from "@/components/abstract-component.js";

const createLoadingMessageTemplate = () => {
  return (
    `<p class="trip-events__msg">Loading...</p>`
  );
};

export default class LoadMessage extends Component {
  getTemplate() {
    return createLoadingMessageTemplate();
  }
}


