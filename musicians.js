export default class Musicians {

  constructor(name, info, birthYear, instruments) {

    this.name = name;
    this.info = info;
    this.birthYear = birthYear;
    this.presentBands = [];
    this.formerBands = [];
    this.instruments = instruments || [];

  }
  getName() {
    return this.name;
  }
}