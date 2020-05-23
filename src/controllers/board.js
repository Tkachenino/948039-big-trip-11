import NoEventComponent from "@/components/noEvent.js";
import SortComponent, {SortType} from "@/components/sort.js";
import DayListComponent from "@/components/dayList.js";
import EventListComponent from "@/components/eventList.js";
import DayCounterComponent from "@/components/dayCounter.js";
import PointController, {EmptyEvent, Mode as EventControllerMode} from "@/controllers/event.js";
import {getGroupList} from "@/utils/common.js";
import {FilterType} from "@/const.js";

import {render, remove, RenderPosition} from "@/utils/render.js";

const renderByGroup = (container, events, offers, destinations, onViewChange, onDataChange) => {
  const groupEvent = getGroupList(events);
  const showingControllers = [];
  for (let i = 0; i < groupEvent.length; i++) {
    render(container, new DayCounterComponent(i, groupEvent[i]), RenderPosition.BEFOREEND);

    const dayPoint = container.querySelectorAll(`.trip-days__item`)[i];

    render(dayPoint, new EventListComponent(), RenderPosition.BEFOREEND);

    const eventList = container.querySelectorAll(`.trip-events__list`)[i];

    groupEvent[i].forEach((event) => {
      const pointController = new PointController(eventList, onViewChange, onDataChange);
      pointController.render(event, EventControllerMode.DEFAULT, offers, destinations);
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

export default class TripController {
  constructor(container, pointsModel, offersModel, destinationModel, api) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._offersModel = offersModel;
    this._destinationModel = destinationModel;
    this._api = api;
    this._creatingEvent = null;

    this._showedEventControllers = [];

    this._noEventComponent = new NoEventComponent();
    this._sortComponent = new SortComponent();
    this._dayListComponent = new DayListComponent();

    this._sortElement = this._sortComponent.getElement();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setTypeSortHandler(this._onSortTypeChange);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const events = this._pointsModel.getPoints();
    const offers = this._offersModel.getOffers();
    const destinations = this._destinationModel.getDestinations();

    const IsHasEvent = (events.length === 0);

    if (IsHasEvent) {
      render(this._container, this._noEventComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._container, this._dayListComponent, RenderPosition.BEFOREEND);

    const dayList = this._dayListComponent.getElement();

    const newEvent = renderByGroup(dayList, events, offers, destinations, this._onViewChange, this._onDataChange);
    this._showedEventControllers = this._showedEventControllers.concat(newEvent);
  }

  createEvent() {
    if (this._creatingEvent) {
      return;
    }

    const events = this._pointsModel.getPoints();
    const IsHasEvent = (events.length === 0);

    if (IsHasEvent) {
      remove(this._noEventComponent);
      render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
      render(this._container, this._dayListComponent, RenderPosition.BEFOREEND);
    } else {
      this._pointsModel.setFilter(FilterType.EVERYTHING);
      document.querySelector(`#filter-everything`).checked = true;
      this._onFilterChange();
    }

    const eventListElement = document.querySelector(`.trip-events__trip-sort`);
    this._creatingEvent = new PointController(eventListElement, this._onViewChange, this._onDataChange);
    this._creatingEvent.render(EmptyEvent, EventControllerMode.ADDING, this._offersModel.getOffers(), this._destinationModel.getDestinations());
    this._showedEventControllers = [].concat(this._creatingEvent, this._showedEventControllers);
    this._creatingEvent = null;
  }

  hideBlock() {
    this._container.classList.add(`visually-hidden`);
  }

  showBlock() {
    this._container.classList.remove(`visually-hidden`);
  }

  _onSortTypeChange(sortType) {
    const events = this._pointsModel.getPoints();
    const offers = this._offersModel.getOffers();
    const destinations = this._destinationModel.getDestinations();

    const dayList = this._dayListComponent.getElement();


    const showingControllers = [];
    this._showedEventControllers = [];

    this._sortElement.querySelector(`.trip-sort__item--day`).innerHTML = ``;
    dayList.innerHTML = ``;
    if (sortType === SortType.EVENT) {
      this._sortElement.querySelector(`.trip-sort__item--day`).innerHTML = `Day`;
      const newEvent = renderByGroup(dayList, events, offers, destinations, this._onViewChange, this._onDataChange);
      this._showedEventControllers = this._showedEventControllers.concat(newEvent);
    }

    const sortedEvents = getSortedEvent(sortType, events);

    render(dayList, new DayCounterComponent(), RenderPosition.BEFOREEND);

    const dayPoint = dayList.querySelector(`.trip-days__item`);

    render(dayPoint, new EventListComponent(), RenderPosition.BEFOREEND);

    const eventList = dayList.querySelector(`.trip-events__list`);
    sortedEvents.forEach((event) => {
      const pointController = new PointController(eventList, this._onViewChange, this._onDataChange);
      pointController.render(event, EventControllerMode.DEFAULT, offers, destinations);
      showingControllers.push(pointController);
    });
    this._showedEventControllers = this._showedEventControllers.concat(showingControllers);
  }

  _removeEvents() {
    const dayList = this._dayListComponent.getElement();
    const dayPoint = dayList.querySelectorAll(`.trip-days__item`);
    dayPoint.forEach((day) => day.remove());
    this._showedEventControllers.forEach((eventController) => eventController.destroy());
    this._showedEventControllers = [];
  }

  _updateEvents() {
    const dayList = this._dayListComponent.getElement();
    const events = this._pointsModel.getPoints();
    const IsHasEvent = (events.length === 0);

    if (IsHasEvent) {
      remove(this._sortComponent);
      remove(this._dayListComponent);
      render(this._container, this._noEventComponent, RenderPosition.BEFOREEND);
      return;
    }

    this._removeEvents();
    const newEvent = renderByGroup(dayList, this._pointsModel.getPoints(), this._offersModel.getOffers(), this._destinationModel.getDestinations(), this._onViewChange, this._onDataChange);
    this._showedEventControllers = this._showedEventControllers.concat(newEvent);
  }

  _onDataChange(eventController, oldData, newData) {
    if (oldData === EmptyEvent) {
      this._creatingEvent = null;
      if (newData === null) {
        eventController.destroy();
        this._updateEvents();
        document.querySelector(`#control__new-event`).disabled = false;
      } else {
        this._api.createPoint(newData)
          .then((pointModel) => {
            this._pointsModel.addEvent(pointModel);
            this._showedEventControllers = [].concat(eventController, this._showedEventControllers);
            this._updateEvents();
            document.querySelector(`#control__new-event`).disabled = false;
          })
          .catch(() => {
            eventController.shake();
          });
      }
    } else if (newData === null) {
      this._api.deletePoint(oldData.id)
        .then(() => {
          this._pointsModel.removeTask(oldData.id);
          this._updateEvents();
        })
        .catch(() => {
          eventController.shake();
        });
    } else {
      this._api.updatePoint(oldData.id, newData)
        .then((pointModel) =>{
          const isSuccess = this._pointsModel.updateEvent(oldData.id, pointModel);
          if (isSuccess) {
            eventController.render(pointModel, EventControllerMode.DEFAULT, this._offersModel.getOffers(), this._destinationModel.getDestinations());
            this._updateEvents();
          }
        })
        .catch(() => {
          eventController.shake();
        });
    }
  }

  _onFilterChange() {
    this._onSortTypeChange(SortType.EVENT);
    document.querySelector(`#sort-event`).checked = true;
    this._updateEvents();
  }

  _onViewChange() {
    this._showedEventControllers.forEach((controller) => controller.setDefaultView());
  }
}
