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


export const generateTripDestination = () => {
  return {
    description: getDescriptionString(),
    name: `Chamonix`,
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `Chamonix parliament building`
      }
    ]
  };
};
