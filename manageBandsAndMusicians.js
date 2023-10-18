import fs from "fs";
import Band from "./band.js";
import Musicians from "./musicians.js";

export default class BandsAndMusicians {
  constructor() {
    this.bands = []
    this.musicians = []
    this.readDataFromFile();
  }
  createBand(bandName, info) {
    const band = new Band(bandName, info);
    this.bands.push(band);
    return band;
  }
  createMusician(name, info, instrument) {
    const musician = new Musicians(name, info, instrument);
    this.musicians.push(musician);
    return musician;
  }
  removeBand(index) {
    if (index <= this.bands.length && index >= 1) {
      index--
      this.bands.splice(index, 1)
      console.log("Band removed successfully")
    }
    else {
      console.log("Invalid band index")
    }
    this.updateJsonFile()
  }

  readDataFromFile() {
    const jsonString = fs.readFileSync("./bandsAndMusicians.json");
    const data = JSON.parse(jsonString);


    for (let i = 0; i < data.length; i++) {
      this.bands.push(new Band(data[i].name, data[i].info));
    }
  }

  updateJsonFile() {

    //let tempList = [];
    /* 
        for (let i = 0; i < this.bands.length; i++) {
    
          console.log(tempList)
          tempList.push(this.bands[i].dataInfo());
    
        } */
    const dataToSave = {
      bands: this.bands.map(band => band.dataInfo()),
      musicians: this.musicians.map(musician => musician.dataInfo())
    }

    fs.writeFileSync('./bandsAndMusicians.json', JSON.stringify(dataToSave, null, 2), (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });
  }
}
