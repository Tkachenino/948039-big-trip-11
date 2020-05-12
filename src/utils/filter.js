import {FilterType} from "@/const.js";

const getPastEvents = (events, date) => {
  return events.filter((event) => event.startDate.getDate() < date.getDate());
};

const getFutureEvents = (events, date) => {
  return events.filter((event) => event.startDate.getDate() > date.getDate());
};

export const getEventsByFilter = (events, filterType) => {
  const nowDate = new Date();

  switch (filterType) {
    case FilterType.EVERYTHING:
      return events;
    case FilterType.PAST:
      return getPastEvents(events, nowDate);
    case FilterType.FUTURE:
      return getFutureEvents(events, nowDate);
  }
  return events;
};
