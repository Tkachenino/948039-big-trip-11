const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
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
  return `${year}/${month}/${day}`;
};

export const getDiffTime = (dateStart, dateFinish) => {
  const day = Math.abs(dateFinish.getDate() - dateStart.getDate());
  const hour = Math.abs(dateFinish.getHours() - dateStart.getHours());
  const minute = Math.abs(dateFinish.getMinutes() - dateStart.getMinutes());
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
