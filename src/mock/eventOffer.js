export const getTripOffer = () => {
  return {
    type: `taxi`,
    offers: [
      {
        title: `Upgrade to a business class`,
        price: 120
      }, {
        title: `Choose the radio station`,
        price: 60
      }
    ]
  };
};
