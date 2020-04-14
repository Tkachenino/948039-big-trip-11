export const createDayPointTemplate = (counter, date) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${counter}</span>
        <time class="day__date" datetime="2019-03-18">${date[0].startDate.getDate()}</time>
      </div>
    </li>`
  );
};
