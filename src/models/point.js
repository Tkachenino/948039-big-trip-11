export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.event = data[`type`];
    this.destination = data[`destination`];
    this.city = this.destination.name;
    this.ownPrice = data[`base_price`];
    this.offer = data[`offers`];
    // this.offersBuff = this.offer.map((offerq) => Object.assign({}, offerq, {name: `meal`}));
    // description: getDescriptionString(),
    // photo: Math.random() > 0.1 ? getRandomIntegers(1, photos.length, photos) : null,
    this.startDate = new Date(data[`date_from`]);
    this.finishDate = new Date(data[`date_to`]);
    this.favoriteFlag = Boolean(data[`is_favorite`]);
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }
}
