import Component from "@/components/abstractComponent.js";

const createInfoWrapperTemplate = () => {
  return (
    `<section class="trip-main__trip-info  trip-info"></section>`
  );
};

export default class InfoWrapper extends Component {
  getTemplate() {
    return createInfoWrapperTemplate();
  }
}
