import Component from "@/components/abstract-component.js";

export const MenuItem = {
  NEW_EVENT: `control__new-event`,
  STATISTICS: `control__statistic`,
  EVENTS: `control__events`,
};

const createMenuBarTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" id="control__events">Table</a>
    <a class="trip-tabs__btn" href="#" id="control__statistic">Stats</a>
   </nav>`
  );
};

export default class Menu extends Component {
  getTemplate() {
    return createMenuBarTemplate();
  }

  setActiveItem(menuItem) {
    const newEventBtn = document.querySelector(`#control__new-event`);
    const tableBtn = document.querySelector(`#control__events`);
    const statsBtn = document.querySelector(`#control__statistic`);
    switch (menuItem) {
      case MenuItem.NEW_EVENT:
        newEventBtn.disabled = true;
        tableBtn.classList.add(`trip-tabs__btn--active`);
        statsBtn.classList.remove(`trip-tabs__btn--active`);
        break;
      case MenuItem.STATISTICS:
        tableBtn.classList.remove(`trip-tabs__btn--active`);
        statsBtn.classList.add(`trip-tabs__btn--active`);
        break;
      case MenuItem.EVENTS:
        tableBtn.classList.add(`trip-tabs__btn--active`);
        statsBtn.classList.remove(`trip-tabs__btn--active`);
        break;
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
