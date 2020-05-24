import moment from "moment";

export const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

export const formatMonth = (date) => {
  return moment(date).format(`MMM`);
};

export const formatDay = (date) => {
  return moment(date).format(`D`);
};

export const formatMonthDay = (date) => {
  return moment(date).format(`MMM D`);
};

export const formatDateTime = (date) => {
  return moment(date).format(`YYYY-MM-DD`);
};

export const getDiffTime = (dateStart, dateFinish) => {
  const dayS = moment(dateStart);
  const dayF = moment(dateFinish);

  if (dateFinish - dateStart < 0) {
    return `Time machine not found`;
  }

  const diffDate = moment.duration(dayF.diff(dayS));

  if (diffDate.days() !== 0) {
    return `${diffDate.days()}D ${diffDate.hours()}H ${diffDate.minutes()}M`;
  } else if (diffDate.hours() !== 0) {
    return `${diffDate.hours()}H ${diffDate.minutes()}M`;
  }

  return `${diffDate.minutes()}M`;
};

export const getGroupList = (items) => {
  const groupList = items.reduce(function (container, event) {
    const day = event.startDate.getDate();

    if (!container.hasOwnProperty(day)) {
      container[day] = [];
    }

    container[day].push(event);
    return container;
  }, {});

  return Object.values(groupList).sort((a, b) => a[0].startDate - b[0].startDate);
};
