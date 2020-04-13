export const EventTransferList = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
export const EventActivityList = [`Check-in`, `Sightseeing`, `Restaurant`];
export const CityList = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`];
export const OfferList = [
  {name: `luggage`, title: `Add luggage`, cost: `30`, isChecked: true,
  },
  {name: `comfort`, title: `Switch to comfort`, cost: `100`, isChecked: true,
  },
  {name: `meal`, title: `Add meal`, cost: `15`, isChecked: true,
  },
  {name: `train`, title: `Travel by train`, cost: `40`, isChecked: true,
  },
  {name: `seats`, title: `Choose seats`, cost: `30`, isChecked: true,
  }
];

const DESCRIPTION_LENGHT = 5;

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

const getDescriptionString = () => {
  const targetList = new Array(Math.floor(1 + Math.random() * (DESCRIPTION_LENGHT - 1)));
  targetList.fill(DescriptionList[Math.floor(Math.random() * DescriptionList.length)]);
  return targetList;
};

const photos = [`1.jpg`, `2.jpg`];

const getRandomDate = () => {
  const timeTarget = new Date();
  timeTarget.setMinutes(Math.floor(Math.random() * 1440));
  return timeTarget;
};

export const generateTripPoint = () => {
  return {
    event: Math.random() > 0.5 ? EventTransferList[Math.floor(Math.random() * EventTransferList.length)] : EventActivityList[Math.floor(Math.random() * EventActivityList.length)],
    city: CityList[Math.floor(Math.random() * CityList.length)],
    ownPrice: Math.floor(Math.random() * 100),
    offer: Math.random() > 0.00005 ? OfferList.slice(0, Math.floor(Math.random() * OfferList.length)) : null,
    description: getDescriptionString(),
    photo: Math.random() > 0.5 ? photos : null,
    startDate: getRandomDate(),
    finishDate: getRandomDate(),
  };
};

export const generateTripPoints = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateTripPoint);
};
