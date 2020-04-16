import {MONTH} from "@/const.js";

export const createDayPointTemplate = (counter, date) => {
  const month = date[0].startDate.getMonth();
  const day = date[0].startDate.getDate();

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${counter + 1}</span>
        <time class="day__date" datetime="2019-03-18">${MONTH[month]} ${day}</time>
      </div>
    </li>`
  );
};
