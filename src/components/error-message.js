import Component from "@/components/abstract-component.js";

const createErrorMessageTemplate = () => {
  return (
    `<p class="trip-events__msg">Oops... Something's going wrong.</br>Please, try later.</p>`
  );
};

export default class ErrorMessage extends Component {
  getTemplate() {
    return createErrorMessageTemplate();
  }
}
