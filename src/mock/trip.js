export const EventTransferList = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
export const EventActivityList = [`Check-in`, `Sightseeing`, `Restaurant`];
export const CityList = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`];
export const OfferList = [
  {name: `luggage`, title: `Add luggage`, cost: `30`,
  },
  {name: `comfort`, title: `Switch to comfort`, cost: `100`,
  },
  {name: `meal`, title: `Add meal`, cost: `15`,
  },
  {name: `train`, title: `Travel by train`, cost: `40`,
  },
  {name: `seats`, title: `Choose seats`, cost: `30`,
  }
];

const DESCRIPTION_LENGHT = 6;

const DescriptionList = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const photos = [`1.jpg`, `2.jpg`, `3.jpg`, `4.jpg`, `5.jpg`];

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};


const getDescriptionString = (count) => {
  const EventDescripList = new Set();
  while (EventDescripList.size <= getRandomIntegerNumber(1, count)) {
    EventDescripList.add(getRandomArrayItem(DescriptionList));
  }
  const string = Array.from(EventDescripList).join(` `);
  return `` + string;

};

const getRandomDate = () => {
  const startTimeTarget = new Date();
  const endTimeTarget = new Date();
  const randomDate = Math.floor(Math.random() * 7 * 24 * 60);
  const randomDuration = Math.floor(Math.random() * 36 * 60);
  startTimeTarget.setMinutes(randomDate);
  endTimeTarget.setMinutes(randomDate + randomDuration);
  return {
    startTimeTarget,
    endTimeTarget,
  };
};

export const generateTripPoint = () => {
  const eventDate = getRandomDate();
  return {
    event: Math.random() > 0.5 ? EventTransferList[Math.floor(Math.random() * EventTransferList.length)] : EventActivityList[Math.floor(Math.random() * EventActivityList.length)],
    city: CityList[Math.floor(Math.random() * CityList.length)],
    ownPrice: Math.floor(Math.random() * 100),
    offer: Math.random() > 0.01 ? OfferList.slice(0, Math.floor(Math.random() * OfferList.length)) : null,
    description: getDescriptionString(DESCRIPTION_LENGHT),
    photo: Math.random() > 0.1 ? photos.slice(0, Math.floor(Math.random() * photos.length)) : null,
    startDate: eventDate.startTimeTarget,
    finishDate: eventDate.endTimeTarget,
  };
};

export const generateTripPoints = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateTripPoint);
};
