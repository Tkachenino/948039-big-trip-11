export const EventTransferList = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
export const EventActivityList = [`Check-in`, `Sightseeing`, `Restaurant`];
export const CityList = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`, `Moscow`, `Nigniy Novgorod`];
export const OfferList = [
  {name: `luggage`, title: `Add luggage`, cost: 30,
  },
  {name: `comfort`, title: `Switch to comfort`, cost: 100,
  },
  {name: `meal`, title: `Add meal`, cost: 15,
  },
  {name: `train`, title: `Travel by train`, cost: 40,
  },
  {name: `seats`, title: `Choose seats`, cost: 30,
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

const getRandomIntegers = (min, max, data) => {
  const integers = new Set();
  while (integers.size <= getRandomIntegerNumber(min, max)) {
    integers.add(getRandomArrayItem(data));
  }
  return Array.from(integers);
};


const getDescriptionString = () => {
  return getRandomIntegers(1, DESCRIPTION_LENGHT, DescriptionList).join(` `);
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
    offer: Math.random() > 0.1 ? getRandomIntegers(0, OfferList.length, OfferList) : ``,
    description: getDescriptionString(),
    photo: Math.random() > 0.1 ? getRandomIntegers(1, photos.length, photos) : null,
    startDate: eventDate.startTimeTarget,
    finishDate: eventDate.endTimeTarget,
    favoriteFlag: Math.random() > 0.5 ? true : false,
  };
};

export const generateTripPoints = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateTripPoint).sort((a, b) => {
    return a.startDate - b.startDate;
  });
};
