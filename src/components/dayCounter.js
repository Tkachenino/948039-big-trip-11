import {AbstractComponent as Component} from "@/components/abstractComponent.js";
import {formatMonthDay, formatDateTime} from "@/utils/common.js";

export const createDayPointTemplate = (counter, date) => {
  if (counter === undefined && date === undefined) {
    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
        </div>
      </li>`
    );
  }
  const data = formatMonthDay(date[0].startDate);
  const datetime = formatDateTime(data[0].startDate);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${counter + 1}</span>
        <time class="day__date" datetime="${datetime}">${data}</time>
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
