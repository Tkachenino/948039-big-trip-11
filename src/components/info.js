import {MONTH} from "@/const.js";
import {AbstractComponent as Component} from "@/components/abstractComponent.js";

const getCityList = (city) => {
  if (city.length < 3) {
    return city.join(` &mdash; `);
  } else {
    return city[0] + ` &mdash; ... &mdash; ` + city[city.length - 1];
  }
};
const createTripInfoTemplate = (dateGroup, date) => {
  let eventCityList = new Set();

  for (const event of date) {
    eventCityList.add(event.city);
  }
  eventCityList = Array.from(eventCityList);

  const cityList = getCityList(eventCityList);

  const monthStart = (dateGroup[0] === undefined) ? `` : dateGroup[0][0].startDate.getMonth();
  const dayStart = (dateGroup[0] === undefined) ? `` : dateGroup[0][0].startDate.getDate();
  const monthEnd = (dateGroup[dateGroup.length - 1] === undefined) ? `` : dateGroup[dateGroup.length - 1][0].startDate.getMonth();
  const dayEnd = (dateGroup[dateGroup.length - 1] === undefined) ? `` : dateGroup[dateGroup.length - 1][0].startDate.getDate();
  const IsSameMonth = monthStart === monthEnd ? `` : MONTH[monthEnd] + ` `;
  const IsHasEvent = (dateGroup[0] === undefined) ? `` : `${MONTH[monthStart]} ${dayStart}&nbsp;&mdash;&nbsp;${IsSameMonth}${dayEnd}`;
  return (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${cityList}</h1>
      <p class="trip-info__dates">${IsHasEvent}</p>
    </div>
  </section>`
  );
};

export class Info extends Component {
  constructor(eventGroup, events) {
    super();
    this._eventGroup = eventGroup;
    this._events = events;
  }

  getTemplate() {
    return createTripInfoTemplate(this._eventGroup, this._events);
  }
}
