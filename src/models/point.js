export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.event = data[`type`];
    this.destination = data[`destination`];
    this.ownPrice = data[`base_price`];
    this.offer = data[`offers`];
    this.startDate = new Date(data[`date_from`]);
    this.finishDate = new Date(data[`date_to`]);
    this.favoriteFlag = Boolean(data[`is_favorite`]);
  }

  toRAW() {
    return {
      "base_price": this.ownPrice,
      "date_from": this.startDate.toISOString(),
      "date_to": this.finishDate.toISOString(),
      "destination": this.destination,
      "id": this.id,
      "is_favorite": this.favoriteFlag,
      "offers": this.offer,
      "type": this.event,
    };
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }

  static clone(data) {
    return new Point(data.toRAW());
  }
}
