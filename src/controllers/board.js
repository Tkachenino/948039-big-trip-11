import {Event as EventComponent} from "@/components/event.js";
import {EventEditor as EventEditorComponent} from "@/components/eventEditor.js";
import {NoEvent as NoEventComponent} from "@/components/noEvent.js";
import {Sort as SortComponent, SortType} from "@/components/sort.js";
import {DayList as DayListComponent} from "@/components/dayList.js";
import {EventList as EventListComponent} from "@/components/eventList.js";
import {DayCounter as DayCounterComponent} from "@/components/dayCounter.js";

import {render, replace, RenderPosition} from "@/utils/render.js";


const renderEvent = (eventListComponent, event) => {
  const showMoreInfo = () => {
    replace(eventEditorComponent, eventComponent);
  };

  const onEscKeyDowm = (evt) => {
    if (evt.key === `Escape`) {
      hideMoreInfo();
      document.removeEventListener(`keydown`, onEscKeyDowm);
    }
  };

  const hideMoreInfo = () => {
    replace(eventComponent, eventEditorComponent);
  };

  const eventComponent = new EventComponent(event);
  eventComponent.setMoreInfoButtonHandler(() => {
    showMoreInfo();
    document.addEventListener(`keydown`, onEscKeyDowm);
  });

  const eventEditorComponent = new EventEditorComponent(event);
  eventEditorComponent.setSubmitFormHandler((evt) => {
    evt.preventDefault();
    hideMoreInfo();
    document.removeEventListener(`keydown`, onEscKeyDowm);
  });

  render(eventListComponent, eventComponent, RenderPosition.BEFOREEND);
};

const renderByGroup = (container, groupEvent) => {
  let counter = 0;
  for (const dayCount of groupEvent) {
    render(container, new DayCounterComponent(counter, dayCount), RenderPosition.BEFOREEND);

    const dayPoint = container.querySelectorAll(`.trip-days__item`)[counter];

    render(dayPoint, new EventListComponent(), RenderPosition.BEFOREEND);

    const eventList = container.querySelectorAll(`.trip-events__list`)[counter];

    dayCount.forEach((event) => {
      renderEvent(eventList, event);
    });

    counter++;
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
    this._noEventComponent = new NoEventComponent();
    this._sortComponent = new SortComponent();
    this._dayListComponent = new DayListComponent();
  }

  render(groupEvent, events) {
    const IsHasEvent = (groupEvent.length === 0);

    if (IsHasEvent) {
      render(this._container, this._noEventComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._container, this._dayListComponent, RenderPosition.BEFOREEND);

    this._dayListComponent = this._dayListComponent.getElement();

    renderByGroup(this._dayListComponent, groupEvent);

    this._sortComponent.setTypeSortHandler((sortType) => {
      this._dayListComponent.innerHTML = ``;
      if (sortType === SortType.EVENT) {
        return renderByGroup(this._dayListComponent, groupEvent);
      }
      const isSorted = `isSorted`;
      const sortedEvents = getSortedEvent(sortType, events);
      render(this._dayListComponent, new DayCounterComponent(isSorted, isSorted), RenderPosition.BEFOREEND);
      const dayPoint = this._dayListComponent.querySelector(`.trip-days__item`);

      render(dayPoint, new EventListComponent(), RenderPosition.BEFOREEND);

      const eventList = this._dayListComponent.querySelector(`.trip-events__list`);
      return sortedEvents.forEach((event) => {
        renderEvent(eventList, event);
      });
    });
  }
}
