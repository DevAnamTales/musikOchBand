import fs from "fs";
import Band from "./band.js";

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
  readDataFromFile() {
    const jsonString = fs.readFileSync("./bandsAndMusicians.json");
    const data = JSON.parse(jsonString);

   
    for (let i = 0; i < data.length; i++) {
      this.bands.push(new Band(data[i].name, data[i].info));
    }
  }

  updateJsonFile() {
    let tempList = []; 

    for (let i = 0; i < this.bands.length; i++) {

      console.log(tempList)
      tempList.push(this.bands[i].dataInfo());

    }

    fs.writeFileSync('./bandsAndMusicians.json', JSON.stringify(tempList, null, 2), (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });
  }
}
