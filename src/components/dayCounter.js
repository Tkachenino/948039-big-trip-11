import {MONTH} from "@/const.js";
import {AbstractComponent as Component} from "@/components/abstractComponent.js";


export const createDayPointTemplate = (counter, date) => {
  if (counter === undefined && date === undefined) {
    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
        </div>
      </li>`
    );
  }

  const month = date[0].startDate.getMonth();
  const day = date[0].startDate.getDate();

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${counter + 1}</span>
        <time class="day__date" datetime="2019-03-18">${MONTH[month]} ${day}</time>
      </div>
    </li>`
  );
};

export class DayCounter extends Component {
  constructor(counter, event) {
    super();
    this._counter = counter;
    this._event = event;
  }

  getTemplate() {
    return createDayPointTemplate(this._counter, this._event);
  }
}
