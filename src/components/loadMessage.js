import {AbstractComponent as Component} from "@/components/abstractComponent.js";

const createLoadingMessageTemplate = () => {
  return (
    `<p class="trip-events__msg">Loading...</p>`
  );
};

export class LoadMessage extends Component {
  getTemplate() {
    return createLoadingMessageTemplate();
  }
}


