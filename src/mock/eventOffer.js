const EventList = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];

const OfferList = [
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


const getTripOffer = (offer) => {
  return offer.map((it) => {
    return {
      type: it,
      offers: Math.random() > 0.1 ? getRandomIntegers(0, OfferList.length, OfferList) : ``,
    };
  });
};

export const DateOffers = getTripOffer(EventList);
