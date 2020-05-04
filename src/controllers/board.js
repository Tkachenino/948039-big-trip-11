import {NoEvent as NoEventComponent} from "@/components/noEvent.js";
import {Sort as SortComponent, SortType} from "@/components/sort.js";
import {DayList as DayListComponent} from "@/components/dayList.js";
import {EventList as EventListComponent} from "@/components/eventList.js";
import {DayCounter as DayCounterComponent} from "@/components/dayCounter.js";
import {PointController} from "@/controllers/event.js";
import {getGroupList} from "@/utils/common.js";

import {render, RenderPosition} from "@/utils/render.js";

const renderByGroup = (container, events, onViewChange) => {
  const groupEvent = getGroupList(events);
  const showingControllers = [];
  for (let i = 0; i < groupEvent.length; i++) {
    render(container, new DayCounterComponent(i, groupEvent[i]), RenderPosition.BEFOREEND);

    const dayPoint = container.querySelectorAll(`.trip-days__item`)[i];

    render(dayPoint, new EventListComponent(), RenderPosition.BEFOREEND);

    const eventList = container.querySelectorAll(`.trip-events__list`)[i];

    groupEvent[i].forEach((event) => {
      const pointController = new PointController(eventList, onViewChange);
      pointController.render(event);
      showingControllers.push(pointController);
    });
  }
  return showingControllers;
};

const getSortedEvent = (sortType, events) => {
  let sortedEvents = [];
  const showingEvents = events.slice();
  switch (sortType) {
    case SortType.TIME:
      sortedEvents = showingEvents.sort((a, b) => (a.startDate - a.finishDate) - (b.startDate - b.finishDate));
      break;
    case SortType.PRICE:
      sortedEvents = showingEvents.sort((a, b) => b.ownPrice - a.ownPrice);
      break;
  }
  return sortedEvents;
};

export class TripController {
  constructor(container) {
    this._container = container;

    this._events = [];

    this._showedEventControllers = [];

    this._noEventComponent = new NoEventComponent();
    this._sortComponent = new SortComponent();
    this._dayListComponent = new DayListComponent();

    this._sortElement = this._sortComponent.getElement();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent.setTypeSortHandler(this._onSortTypeChange);
  }

  render(events) {
    this._events = events;

    const IsHasEvent = (this._events.length === 0);

    if (IsHasEvent) {
      render(this._container, this._noEventComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._container, this._dayListComponent, RenderPosition.BEFOREEND);

    this._dayListComponent = this._dayListComponent.getElement();

    const newEvent = renderByGroup(this._dayListComponent, this._events, this._onViewChange);
    this._showedEventControllers = this._showedEventControllers.concat(newEvent);
  }

  _onSortTypeChange(sortType) {
    const showingControllers = [];
    this._showedEventControllers = [];

    this._sortElement.querySelector(`.trip-sort__item--day`).innerHTML = ``;
    this._dayListComponent.innerHTML = ``;
    if (sortType === SortType.EVENT) {
      this._sortElement.querySelector(`.trip-sort__item--day`).innerHTML = `Day`;
      const newEvent = renderByGroup(this._dayListComponent, this._events, this._onViewChange);
      this._showedEventControllers = this._showedEventControllers.concat(newEvent);
    }

    const sortedEvents = getSortedEvent(sortType, this._events);

    render(this._dayListComponent, new DayCounterComponent(), RenderPosition.BEFOREEND);

    const dayPoint = this._dayListComponent.querySelector(`.trip-days__item`);

    render(dayPoint, new EventListComponent(), RenderPosition.BEFOREEND);

    const eventList = this._dayListComponent.querySelector(`.trip-events__list`);
    sortedEvents.forEach((event) => {
      const pointController = new PointController(eventList, this._onViewChange);
      pointController.render(event);
      showingControllers.push(pointController);
    });
    this._showedEventControllers = this._showedEventControllers.concat(showingControllers);
  }

  _onViewChange() {
    this._showedEventControllers.forEach((controller) => controller.setDefaultView());
  }
}
