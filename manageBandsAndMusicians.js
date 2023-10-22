import fs from "fs";
import Band from "./band.js";
import Musicians from "./musicians.js";

export default class BandsAndMusicians {
  constructor() {
    this.bands = []
    this.musicians = []
    this.readDataFromFile('bands.json', 'musicians.json');
  }

  createBand(bandName, info, formedYear, resolvedYear) {
    if (resolvedYear === "") {
      resolvedYear = null;
    }
    const band = new Band(bandName, info, formedYear, resolvedYear);
    this.bands.push(band);
    return band;
  }

  createMusician(name, info, birthyear, instruments) {
    const musician = new Musicians(name, info, birthyear, instruments);
    this.musicians.push(musician);
    return musician;
  }

  listAllBands() {
    if (this.bands.length === 0) {
      return 'No bands available.';
    }
    return this.bands.map((band) => band.name).join(', ');
  }

  listAllMusicians() {
    if (this.musicians.length === 0) {
      return 'No musician available.';
    }
    return this.musicians.map((musician) => musician.name).join(', ');
  }

  addMusicianToBand(musician, bandName) {

    console.log(`Band Name: ${bandName}`);
    console.log(`Band Names in Data: ${this.bands.map(band => band.name)}`);
    console.log(`Musician Name: ${musician.name}`);


    const band = this.bands.find((band) => band.name === bandName);
    if (band) {
      band.members.push(musician);
      console.log("ok")
      musician.presentBands.push(band);
      console.log("ok")
      return true;
    } else {
      console.log(`Band with name ${bandName} not found.`);
      return false;
    }
  }

  removeMusicianFromBand(musician, bandName) {
    const band = this.bands.find(b => b.name === bandName);
    if (band) {
      const index = band.members.indexOf(musician);
      if (index !== -1) {
        // Remove the musician from the band's members
        const removedMusician = band.members.splice(index, 1)[0];

        // Remove the band from the musician's presentBands
        const musicianIndex = removedMusician.presentBands.indexOf(band);
        if (musicianIndex !== -1) {
          removedMusician.presentBands.splice(musicianIndex, 1);
        }

        // Update the musician's formerBands and the band's formerMembers
        removedMusician.formerBands.push(band);
        band.formerMembers.push(removedMusician);

        return true; // Indicate success
      }
    }
    return false; // Indicate failure
  }

  addBandToMusician(musicianName, bandName) {
    const musician = this.musicians.find(m => m.name === musicianName);
    const band = this.bands.find(b => b.name === bandName);

    if (musician && band) {
      if (!musician.presentBands.includes(band)) {
        musician.presentBands.push(band);
        return true; // Success
      }
    }
    return false; // Failure
  }

  removeBandFromMusician(musicianName, bandName) {
    const musician = this.musicians.find(m => m.name === musicianName);
    const band = this.bands.find(b => b.name === bandName);
    console.log("Musician:", musician);
    console.log("Present Bands:", musician.presentBands);
    if (musician && band) {
      const bandIndex = musician.presentBands.indexOf(band);
      console.log(bandIndex)
      if (bandIndex !== -1) {
        musician.presentBands.splice(bandIndex, 1);
        console.log("ok")

        return true; // Success
      }
    }
    return false; // Failure
  }

  removeMusicianByName(name) {
    const index = this.musicians.findIndex(musician => musician.name === name);

    if (index !== -1) {
      this.musicians.splice(index, 1);
      console.log(`${name} removed successfully`);
    } else {
      console.log("Musician not found");
    }

    this.updateJsonFiles('musicians.json');
  }

  // Method to get information about a specific band
  getBandInfo(bandName) {
    const band = this.bands.find(b => b.name === bandName);
    if (band) {
      return {
        name: band.name,
        info: band.info,
        formedYear: band.formedYear,
        resolvedYear: band.resolvedYear,
        members: band.members.map(member => ({
          name: member.name,
          bithYear: member.birthyear,
          instruments: member.instruments[0]
        })),
        formerMembers: band.formerMembers.map(formerMember => ({
          name: formerMember.name,
        }))
      };
    } else {
      return null; // Band not found
    }
  }

  removeBandByName(name) {
    const index = this.bands.findIndex(band => band.name === name);

    if (index !== -1) {
      this.bands.splice(index, 1);
      console.log(`${name} removed successfully`);
    } else {
      console.log("Band not found");
    }

    this.updateJsonFiles('bands.json');
  }

  readDataFromFile(bandsFile, musiciansFile) {
    try {
      const bandsData = fs.readFileSync(bandsFile, 'utf8');
      const parsedBandsData = JSON.parse(bandsData);

      // Convert "formedYear" property to a number for each band
      this.bands = parsedBandsData.bands.map(band => ({
        ...band,
        //formedYear: parseInt(band.formedYear),
      }));

      const musiciansData = fs.readFileSync(musiciansFile, 'utf8');
      const parseMusciandData = JSON.parse(musiciansData);
      this.musicians = parseMusciandData.musicians.map(musician => ({
        ...musician
      }))

    } catch (error) {
      console.error('Error reading data from JSON files:', error);
    }
  }

  updateJsonFiles(fileName) {
    let dataToSave = {};

    if (fileName === 'bands.json') {
      dataToSave = {
        //bands: this.bands,
        bands: this.bands.map(band => ({
          ...band,
          members: band.members ? band.members.map(member => ({
            name: member.name,
            info: member.info,
            instruments: member.instruments
          })) : [], // Extract member names, info, and instruments or use an empty array if null
          formerMembers: band.formerMembers ? band.formerMembers.map(formerMember => ({
            name: formerMember.name,
            info: formerMember.info,
            instruments: formerMember.instruments
          })) : [], // Extract former member names, info, and instruments or use an empty array if null
        })),
      };
    } else if (fileName === 'musicians.json') {
      dataToSave = {
        //musicians: this.musicians,
        musicians: this.musicians.map(musician => ({
          ...musician,
          presentBands: musician.presentBands.map(presentBand => ({
            name: presentBand.name,
            info: presentBand.info, // Include other band properties if needed
          })),
          formerBands: musician.formerBands.map(formerBand => ({
            name: formerBand.name,
            info: formerBand.info, // Include other band properties if needed
          })),
        }),
      )};
    }
    fs.writeFileSync(`./${fileName}`, JSON.stringify(dataToSave, null, 2), (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });
  }
}