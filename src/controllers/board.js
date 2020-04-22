import {Event as EventComponent} from "@/components/event.js";
import {EventEditor as EventEditorComponent} from "@/components/eventEditor.js";
import {NoEvent as NoEventComponent} from "@/components/noEvent.js";
import {Sort as SortComponent} from "@/components/sort.js";
import {DayList as DayListComponent} from "@/components/dayList.js";
import {EventList as EventListComponent} from "@/components/eventList.js";
import {DayCounter as DayCounterComponent} from "@/components/dayCounter.js";

import {render, replace, RenderPosition} from "@/utils/render.js";

let counter = 0;

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

export class TripController {
  constructor(container) {
    this._container = container;
    this._noEventComponent = new NoEventComponent();
    this._sortComponent = new SortComponent();
    this._dayListComponent = new DayListComponent();
  }

  render(groupEvent) {
    const IsHasEvent = (groupEvent.length === 0);

    if (IsHasEvent) {
      render(this._container, this._noEventComponent, RenderPosition.BEFOREEND);
      return;
    }
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._container, this._dayListComponent, RenderPosition.BEFOREEND);

    for (const dayCount of groupEvent) {
      render(this._container, new DayCounterComponent(counter, dayCount), RenderPosition.BEFOREEND);

      const dayPoint = this._container.querySelectorAll(`.trip-days__item`)[counter];

      render(dayPoint, new EventListComponent(), RenderPosition.BEFOREEND);

      const eventList = this._container.querySelectorAll(`.trip-events__list`)[counter];

      dayCount.forEach((event) => {
        renderEvent(eventList, event);
      });

      counter++;
    }
  }
}
