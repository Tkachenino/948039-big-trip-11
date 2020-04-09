const EventList = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const CityList = [`Amsterdam`, `Chamonix`, `Geneva`];
const OfferList = [
  {
    title: `add luggage`,
    cost: `30`,
  },
  {
    title: `switch to comfort`,
    cost: `100`,
  },
  {
    title: `add meal`,
    cost: `15`,
  },
  {
    title: `travel by train`,
    cost: `40`,
  },
  {
    title: `choose seats`,
    cost: `30`,
  }
];
const DescriptionList = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const getDescriptionString = () => {
  const targetList = new Array(Math.floor(1 + Math.random() * (5 - 1)));
  targetList.fill(DescriptionList[Math.random() * DescriptionList.length]);
  return targetList;
};
const photos = [`../public/img/photos/1.jpg`, `../public/img/photos/2.jpg`];

export const generateTripPoint = () => {
  return {
    event: EventList[Math.floor(Math.random() * EventList.length)],
    city: CityList[Math.floor(Math.random() * CityList.length)],
    ownPrice: Math.floor(Math.random() * 100),
    offer: Math.random() > 0.005 ? OfferList.slice(1, Math.floor(Math.random() * OfferList.length)) : null,
    description: getDescriptionString(),
    photo: photos,
  };
};

export const generateTripPoints = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateTripPoint);
};
