import {AbstractComponent as Component} from "@/components/abstractComponent.js";

export const MenuItem = {
  NEW_EVENT: `control__new-event`,
  STATISTICS: `control__statistic`,
  EVENTS: `control__events`,
};

export const createMenuBarTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" id="control__events">Table</a>
    <a class="trip-tabs__btn" href="#" id="control__statistic">Stats</a>
   </nav>`
  );
};

export class Menu extends Component {
  getTemplate() {
    return createMenuBarTemplate();
  }

  setActiveItem(menuItem) {
    const item = document.querySelector(`#${menuItem}`);
    if (item) {
      item.disabled = true;
    }
  }

  setOnChange(handler) {
    document.addEventListener(`click`, (evt) => {
      if (evt.target.id !== `control__events` && evt.target.id !== `control__statistic` && evt.target.id !== `control__new-event`) {
        return;
      }

      const menuItem = evt.target.id;

      handler(menuItem);
    });
  }
}
