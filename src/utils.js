const MILLISEC_PER_MIN = 60000;
const MILLISEC_PER_HOUR = MILLISEC_PER_MIN * 60;
const MILLISEC_PER_DAY = MILLISEC_PER_HOUR * 24;

export const RenderPosition = {
  BEFOREBEGIN: `beforebegin`,
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

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

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export class Component {
  constructor() {
    this._element = null;
  }

  getTemplate() {
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      container.before(element);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};
