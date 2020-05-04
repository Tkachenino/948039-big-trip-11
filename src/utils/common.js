const MILLISEC_PER_MIN = 60000;
const MILLISEC_PER_HOUR = MILLISEC_PER_MIN * 60;
const MILLISEC_PER_DAY = MILLISEC_PER_HOUR * 24;

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};

export const getTime = (date) => {
  const hour = castTimeFormat(date.getHours());
  const minute = castTimeFormat(date.getMinutes());
  return `${hour}:${minute}`;
};

export const getTimeDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

export const getEditTimeDate = (date) => {
  const year = castTimeFormat(date.getFullYear() % 2000);
  const month = castTimeFormat(date.getMonth() + 1);
  const day = date.getDate();
  return `${day}/${month}/${year}`;
};

export const getDiffTime = (dateStart, dateFinish) => {
  const diffDate = dateFinish - dateStart;
  const day = Math.floor(diffDate / MILLISEC_PER_DAY);
  const hour = Math.floor(diffDate % MILLISEC_PER_DAY / MILLISEC_PER_HOUR);
  const minute = Math.floor(diffDate % MILLISEC_PER_DAY % MILLISEC_PER_HOUR / MILLISEC_PER_MIN);
  if (day) {
    return `${day}D ${hour}H ${minute}M`;
  } else if (hour) {
    return `${hour}H ${minute}M`;
  } else if (minute) {
    return `${minute}M`;
  } else {
    return ``;
  }
};

export const getGroupList = (items) => {
  const groupList = items.reduce(function (obj, event) {
    const day = event.startDate.getDate();

    if (!obj.hasOwnProperty(day)) {
      obj[day] = [];
    }

    obj[day].push(event);
    return obj;
  }, {});

  return Object.values(groupList).sort((a, b) => a[0].startDate - b[0].startDate);
};
