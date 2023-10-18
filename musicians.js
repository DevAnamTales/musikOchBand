export default class Musicians {

  constructor(name, info, instrument) {
    this.name = name;
    this.infoText = info;
    //this.#birthYear = birthYear;
    //this.#bands = bands;
    //this.#formerBands = formerBands;
    this.instrument = instrument;

  }
  dataInfo() {
    return {
      "name": this.name,
      "info": this.infoText,
      "instrument": this.instrument

    };
  }
}