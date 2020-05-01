import {NoEvent as NoEventComponent} from "@/components/noEvent.js";
import {Sort as SortComponent, SortType} from "@/components/sort.js";
import {DayList as DayListComponent} from "@/components/dayList.js";
import {EventList as EventListComponent} from "@/components/eventList.js";
import {DayCounter as DayCounterComponent} from "@/components/dayCounter.js";
import {PointController} from "@/controllers/event.js";

import {render, RenderPosition} from "@/utils/render.js";

const renderByGroup = (container, groupEvent, onDataChange) => {
  for (let i = 0; i < groupEvent.length; i++) {
    render(container, new DayCounterComponent(i, groupEvent[i]), RenderPosition.BEFOREEND);

    const dayPoint = container.querySelectorAll(`.trip-days__item`)[i];

    render(dayPoint, new EventListComponent(), RenderPosition.BEFOREEND);

    const eventList = container.querySelectorAll(`.trip-events__list`)[i];

    groupEvent[i].forEach((event) => {
      const pointController = new PointController(eventList, onDataChange);
      pointController.render(event);
    });
  }
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

    this._groupEvent = [];
    this._events = [];

    this._onDataChange = this._onDataChange.bind(this);

    this._noEventComponent = new NoEventComponent();
    this._sortComponent = new SortComponent();
    this._dayListComponent = new DayListComponent();

    this._sortElement = this._sortComponent.getElement();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sortComponent.setTypeSortHandler(this._onSortTypeChange);
  }

  render(groupEvent, events) {
    this._groupEvent = groupEvent;
    this._events = events;

    const IsHasEvent = (this._groupEvent.length === 0);

    if (IsHasEvent) {
      render(this._container, this._noEventComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._container, this._dayListComponent, RenderPosition.BEFOREEND);

    this._dayListComponent = this._dayListComponent.getElement();

    renderByGroup(this._dayListComponent, this._groupEvent, this._onDataChange);
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));

    taskController.render(this._events[index]);
  }

  _onSortTypeChange(sortType) {
    this._sortElement.querySelector(`.trip-sort__item--day`).innerHTML = ``;
    this._dayListComponent.innerHTML = ``;
    if (sortType === SortType.EVENT) {
      this._sortElement.querySelector(`.trip-sort__item--day`).innerHTML = `Day`;
      return renderByGroup(this._dayListComponent, this._groupEvent, this._onDataChange);
    }

    const sortedEvents = getSortedEvent(sortType, this._events);

    render(this._dayListComponent, new DayCounterComponent(), RenderPosition.BEFOREEND);

    const dayPoint = this._dayListComponent.querySelector(`.trip-days__item`);

    render(dayPoint, new EventListComponent(), RenderPosition.BEFOREEND);

    const eventList = this._dayListComponent.querySelector(`.trip-events__list`);
    return sortedEvents.forEach((event) => {
      const pointController = new PointController(eventList, this._onDataChange);
      pointController.render(event);
    });
  }
}
