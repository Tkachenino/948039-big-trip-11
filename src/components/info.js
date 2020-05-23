import {formatMonth, formatDay, getGroupList} from "@/utils/common.js";
import Component from "@/components/abstractComponent.js";

const getCityList = (city, data) => {
  if (city.length <= 3) {
    return city.join(` &mdash; `);
  } else {
    return data[0].destination.name + ` &mdash; ... &mdash; ` + data[data.length - 1].destination.name;
  }
};

const createTripInfoTemplate = (data) => {
  let eventCityList = new Set();

  for (const event of data) {
    eventCityList.add(event.destination.name);
  }

  eventCityList = Array.from(eventCityList);
  const cityList = getCityList(eventCityList, data);
  const dateGroup = getGroupList(data);

  const monthStart = (dateGroup[0] === undefined) ? `` : formatMonth(dateGroup[0][0].startDate);
  const dayStart = (dateGroup[0] === undefined) ? `` : formatDay(dateGroup[0][0].startDate);
  const monthEnd = (dateGroup[dateGroup.length - 1] === undefined) ? `` : formatMonth(dateGroup[dateGroup.length - 1][0].startDate);
  const dayEnd = (dateGroup[dateGroup.length - 1] === undefined) ? `` : formatDay(dateGroup[dateGroup.length - 1][0].startDate);
  const IsSameMonth = monthStart === monthEnd ? `` : monthEnd + ` `;
  const IsHasEvent = (dateGroup[0] === undefined) ? `` : `${monthStart} ${dayStart}&nbsp;&mdash;&nbsp;${IsSameMonth}${dayEnd}`;

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${cityList}</h1>
      <p class="trip-info__dates">${IsHasEvent}</p>
    </div>`
  );
};

export default class Info extends Component {
  constructor(pointsModel) {
    super();
    this._pointsModel = pointsModel;
  }

  getTemplate() {
    const events = this._pointsModel.getPoints();
    return createTripInfoTemplate(events);
  }
}
