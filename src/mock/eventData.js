export const EventTransferList = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];
export const EventActivityList = [`check-in`, `sightseeing`, `restaurant`];
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


const getRandomDate = () => {
  const startTimeTarget = new Date();
  const endTimeTarget = new Date();
  const randomDate = Math.random() > 0.5 ? -Math.floor(Math.random() * 7 * 24 * 60) : Math.floor(Math.random() * 7 * 24 * 60);
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
    id: Math.random(),
    event: Math.random() > 0.5 ? EventTransferList[Math.floor(Math.random() * EventTransferList.length)] : EventActivityList[Math.floor(Math.random() * EventActivityList.length)],
    city: CityList[Math.floor(Math.random() * CityList.length)],
    ownPrice: Math.floor(Math.random() * 100),
    offer: Math.random() > 0.1 ? getRandomIntegers(0, OfferList.length, OfferList) : ``,
    // description: getDescriptionString(),
    // photo: Math.random() > 0.1 ? getRandomIntegers(1, photos.length, photos) : null,
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
