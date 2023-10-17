export default class Musiker{
  #namn;
  #infoText;
  #birthYear;
  #bands;
  #formerBands;
  #instruments;
  constructor(name, info, birthYear, bands, formerBands, instrument) {
    this.namn = name;
    this.infoText = info;
    //this.#birthYear = birthYear;
    //this.#bands = bands;
    //this.#formerBands = formerBands;
    this.instrument = instrument;

  }
}