import {Info as InfoComponent} from "@/components/info.js";
import {Cost as CostComponent} from "@/components/cost.js";
import {Menu as MenuComponent} from "@/components/menu.js";
import {Filter as FilterComponent} from "@/components/filter.js";
import {Sort as SortComponent} from "@/components/sort.js";
import {EventEditor as EventEditorComponent} from "@/components/eventEditor.js";
import {DayList as DayListComponent} from "@/components/dayList.js";
import {DayCounter as DayCounterComponent} from "@/components/dayCounter.js";
import {EventList as EventListComponent} from "@/components/eventList.js";
import {Event as EventComponent} from "@/components/event.js";
import {NoEvent as NoEventComponent} from "@/components/noEvent.js";
import {render, RenderPosition} from "@/utils.js";
import {generateTripPoints} from "@/mock/eventData.js";

const POINT_COUNT = 20;
let counter = 0;
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

const renderEvent = (eventListComponent, event) => {
  const showMoreInfo = () => {
    eventListComponent.replaceChild(eventEditorComponent.getElement(), eventComponent.getElement());
  };

  const onEscKeyDowm = (evt) => {
    if (evt.key === `Escape`) {
      hideMoreInfo();
      document.removeEventListener(`keydown`, onEscKeyDowm);
    }
  };

  const hideMoreInfo = () => {
    eventListComponent.replaceChild(eventComponent.getElement(), eventEditorComponent.getElement());
  };

  const eventComponent = new EventComponent(event);
  const moreInfoButton = eventComponent.getElement().querySelector(`.event__rollup-btn`);
  moreInfoButton.addEventListener(`click`, () => {
    showMoreInfo();
    document.addEventListener(`keydown`, onEscKeyDowm);
  });

  const eventEditorComponent = new EventEditorComponent(event);
  const eventForm = eventEditorComponent.getElement();
  eventForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    hideMoreInfo();
    document.removeEventListener(`keydown`, onEscKeyDowm);
  });

  render(eventListComponent, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderDayList = (boardComponent, groupEvent) => {
  const IsHasEvent = (groupEvent.length === 0);

  if (IsHasEvent) {
    render(boardComponent, new NoEventComponent().getElement(), RenderPosition.BEFOREEND);
    return;
  }
  render(boardComponent, new SortComponent().getElement(), RenderPosition.BEFOREEND);
  render(boardComponent, new DayListComponent().getElement(), RenderPosition.BEFOREEND);

  for (const dayCount of groupEvent) {
    render(boardComponent, new DayCounterComponent(counter, dayCount).getElement(), RenderPosition.BEFOREEND);

    const dayPoint = boardComponent.querySelectorAll(`.trip-days__item`)[counter];

    render(dayPoint, new EventListComponent().getElement(), RenderPosition.BEFOREEND);

    const eventList = boardComponent.querySelectorAll(`.trip-events__list`)[counter];

    dayCount.forEach((event) => {
      renderEvent(eventList, event);
    });

    counter++;
  }
};


const siteMainElement = document.querySelector(`.trip-main`);

render(siteMainElement, new InfoComponent(tripValue, tripList).getElement(), RenderPosition.AFTERBEGIN);

const siteInfoTrip = siteMainElement.querySelector(`.trip-info`);

render(siteInfoTrip, new CostComponent(tripList).getElement(), RenderPosition.BEFOREEND);

const siteControls = siteMainElement.querySelector(`.trip-controls`);
const siteMenu = siteControls.querySelector(`h2:nth-child(1)`);
const siteFilter = siteControls.querySelector(`h2:nth-child(2)`);

render(siteMenu, new MenuComponent().getElement(), RenderPosition.AFTEREND);
render(siteFilter, new FilterComponent().getElement(), RenderPosition.AFTEREND);

const siteBoardEvents = document.querySelector(`.trip-events`);

renderDayList(siteBoardEvents, tripValue);
