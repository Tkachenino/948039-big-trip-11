import {createTripInfoTemplate} from "@/components/tripInfoTemplate.js";
import {createTripCostTemplate} from "@/components/tripCostTemplate.js";
import {createMenuBarTemplate} from "@/components/menuBarTemplate.js";
import {createMenuFilterTemplate} from "@/components/menuFilterTemplate.js";
import {createPointsSortElementTemplate} from "@/components/pointsSortElementTemplate.js";
import {createFormEditorTemplate} from "@/components/formEditorTemplate.js";
import {createDayListTemplate} from "@/components/dayListTemplate.js";
import {createDayPointTemplate} from "@/components/dayPointTemplate.js";
import {createEventPointListTemplate} from "@/components/eventPointListTemplate.js";
import {createPointEventTeplate} from "@/components/pointEventTemplate.js";

import {generateTripPoints} from "@/mock/trip.js";

const POINT_COUNT = 3;

const trip = generateTripPoints(POINT_COUNT);

const render = (container, content, place = `beforeend`) => {
  container.insertAdjacentHTML(place, content);
};

const siteMainElement = document.querySelector(`.trip-main`);
const siteControls = siteMainElement.querySelector(`.trip-controls`);
const siteMenu = siteControls.querySelector(`h2:nth-child(1)`);
const siteFilter = siteControls.querySelector(`h2:nth-child(2)`);
const siteBoardEvents = document.querySelector(`.trip-events`);

render(siteMainElement, createTripInfoTemplate(), `afterbegin`);

const siteInfoTrip = siteMainElement.querySelector(`.trip-info`);

render(siteInfoTrip, createTripCostTemplate());
render(siteMenu, createMenuBarTemplate(), `afterend`);
render(siteFilter, createMenuFilterTemplate(), `afterend`);
render(siteBoardEvents, createPointsSortElementTemplate());
render(siteBoardEvents, createFormEditorTemplate());
render(siteBoardEvents, createDayListTemplate());

const dayList = siteBoardEvents.querySelector(`.trip-days`);

render(dayList, createDayPointTemplate());

const dayPoint = dayList.querySelector(`.trip-days__item`);

render(dayPoint, createEventPointListTemplate());

const eventList = siteBoardEvents.querySelector(`.trip-events__list`);

for (let i = 0; i < POINT_COUNT; i++) {
  render(eventList, createPointEventTeplate(trip[i]));
}
