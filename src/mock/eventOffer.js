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

const getTripOffer = (offer) => {
  return offer.map((it) => {
    return {
      type: it,
      offers: OfferList,
    };
  });
};

export const DateOffers = getTripOffer(EventList);
