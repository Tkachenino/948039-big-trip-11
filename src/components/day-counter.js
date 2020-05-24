import Component from "@/components/abstract-component.js";
import {formatMonthDay, formatDateTime} from "@/utils/common.js";

const createDayCounterTemplate = (counter, data) => {
  if (counter === undefined && data === undefined) {
    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
        </div>
      </li>`
    );
  }
  const day = formatMonthDay(data[0].startDate);
  const dateTime = formatDateTime(day[0].startDate);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${counter + 1}</span>
        <time class="day__date" datetime="${dateTime}">${day}</time>
      </div>
    </li>`
  );
};

export default class DayCounter extends Component {
  constructor(counter, event) {
    super();
    this._counter = counter;
    this._event = event;
  }

  getTemplate() {
    return createDayCounterTemplate(this._counter, this._event);
  }
}
