import {createTripInfoTemplate} from "@/components/info.js";
import {createTripCostTemplate} from "@/components/cost.js";
import {createMenuBarTemplate} from "@/components/menu.js";
import {createMenuFilterTemplate} from "@/components/filter.js";
import {createPointsSortElementTemplate} from "@/components/sort.js";
import {createFormEditorTemplate} from "@/components/eventEditor.js";
import {createDayListTemplate} from "@/components/dayList.js";
import {createDayPointTemplate} from "@/components/dayCounter.js";
import {createEventPointListTemplate} from "@/components/eventList.js";
import {createPointEventTeplate} from "@/components/event.js";

import {generateTripPoints} from "@/mock/trip.js";

const POINT_COUNT = 25;

const tripList = generateTripPoints(POINT_COUNT);

const groupTripList = tripList.reduce(function (obj, event) {
  const day = event.startDate.getDate();

  if (!obj.hasOwnProperty(day)) {
    obj[day] = [];
  }

  obj[day].push(event);
  return obj;
}, {});

const tripValue = Object.values(groupTripList);

const render = (container, content, place = `beforeend`) => {
  container.insertAdjacentHTML(place, content);
};

const siteMainElement = document.querySelector(`.trip-main`);
const siteControls = siteMainElement.querySelector(`.trip-controls`);
const siteMenu = siteControls.querySelector(`h2:nth-child(1)`);
const siteFilter = siteControls.querySelector(`h2:nth-child(2)`);
const siteBoardEvents = document.querySelector(`.trip-events`);

render(siteMainElement, createTripInfoTemplate(tripValue, tripList), `afterbegin`);

const siteInfoTrip = siteMainElement.querySelector(`.trip-info`);

render(siteInfoTrip, createTripCostTemplate(tripList));
render(siteMenu, createMenuBarTemplate(), `afterend`);
render(siteFilter, createMenuFilterTemplate(), `afterend`);
render(siteBoardEvents, createPointsSortElementTemplate());
render(siteBoardEvents, createFormEditorTemplate(tripList[0]));
render(siteBoardEvents, createDayListTemplate());

const dayList = siteBoardEvents.querySelector(`.trip-days`);

let counter = 0;

for (const dayCount of tripValue) {
  render(dayList, createDayPointTemplate(counter, dayCount));

  const dayPoint = dayList.querySelectorAll(`.trip-days__item`)[counter];

  render(dayPoint, createEventPointListTemplate());

  const eventList = siteBoardEvents.querySelectorAll(`.trip-events__list`)[counter];

  for (let q = 0; q < dayCount.length; q++) {
    render(eventList, createPointEventTeplate(dayCount[q]));
  }
  counter++;
}
