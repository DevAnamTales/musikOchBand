export default class Musicians {

  constructor(name, info, birthYear, instruments) {

    this.name = name;
    this.info = info;
    this.birthYear = birthYear;
    this.presentBands = [];
    this.formerBands = [];
    this.instruments = instruments || [];

  }
  /*   dataInfo() {
      return {
        "id": this.id,
        "name": this.name,
        "info": this.infoText,
        "instrument": this.instrument
  
      };
    } */
  getName() {
    return this.name;
  }
}