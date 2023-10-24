import PromptSync from "prompt-sync";
import BandsAndMusicians from "./manageBandsAndMusicians.js";
//import Musicians from "./musicians.js";
//import fs from "fs";

const prompt = PromptSync({ sigint: true });
const bandAndMusicians = new BandsAndMusicians();
//const musicians = new Musicians()


// Start Meny
let run = true;
while (run) {
  console.log(`
Meny

1. Create a band
2- Remove a band
3- Create a musician
4- Remove a musician
5- Add/remove musician to/from band
6- Add/remove band to/from musician
7- Show band info
8- Show musician info
E. Terminate Program

Val ->`);
  const val = prompt();

  switch (val.trim().toUpperCase()) {

    case "1":
      const bandName = prompt("Band Name: ");
      const bandInfo = prompt("Band Info: ");
      const formedYear = parseInt(prompt("Band Formed Year: "));
      const resolvedYear = prompt("Band Resolved Year, if band exists press enter : ");

      console.log("creating a band");
      const newBand = bandAndMusicians.createBand(bandName, bandInfo, formedYear, resolvedYear);
      console.log(newBand);
      //fs.writeFileSync("bands.json", JSON.stringify(newBand, null, 2))
      bandAndMusicians.updateJsonFiles('bands.json')
      break;

    case "2":
      const allBands = bandAndMusicians.listAllBands()
      console.log(allBands)
      const bandToRemove = prompt("Enter the Band name to remove: ");
      bandAndMusicians.removeBandByName(bandToRemove)
      break;

    case "3":
      const name = prompt("Name: ")
      const info = prompt("Info: ")
      const birthYear = parseInt(prompt("BirthYear: "))
      const addInstrument = prompt("Instruments: (comma separated valuse)")
      const instruments = addInstrument.split(',').map((instrument) => instrument.trim());

      const newMuscian = bandAndMusicians.createMusician(name, info, birthYear, instruments)
      console.log(newMuscian)
      bandAndMusicians.updateJsonFiles('musicians.json')
      break;

    case "4":
      console.log(bandAndMusicians.listAllMusicians())
      const musicianName = prompt("Enter the name of musician to remove: ")
      bandAndMusicians.removeMusicianByName(musicianName)
      break;

    case "5":
      const all_Bands = bandAndMusicians.listAllBands()
      console.log(all_Bands)
      const bandName1 = prompt("Band Name: ");
      const musicianNameToAddOrRemove = prompt("Musician Name: ");
      console.log("Band Name to Add/Remove: " + bandName1);
      console.log("Musician Name to Add/Remove: " + musicianNameToAddOrRemove);

      const band = bandAndMusicians.bands.find(b => b.name === bandName1);
      const musician = bandAndMusicians.musicians.find(m => m.name === musicianNameToAddOrRemove);

      if (band && musician) {
        let validAction = false;
        let action;

        while (!validAction) {

          action = prompt("Add or Remove? (A/R): ").toUpperCase();
          if (action === "A" || action === "R") {
            validAction = true;
          } else {
            console.log("Invalid action. Use 'A' to add or 'R' to remove.");
          }
        }

        if (action === "A") {
          const added = bandAndMusicians.addMusicianToBand(musician, bandName1);
          console.log(added)
          if (added) {
            console.log(`${musician.name} added to ${band.name}`);
            bandAndMusicians.updateJsonFiles('bands.json');
            bandAndMusicians.updateJsonFiles('musicians.json');
          } else {
            console.log("Invalid musician or band selection.");
          }
        } else if (action === "R") {
          const removed = bandAndMusicians.removeMusicianFromBand(musician, bandName1);
          if (removed) {
            console.log(`${musician.name} removed from ${band.name}`);
            bandAndMusicians.updateJsonFiles('bands.json');
            bandAndMusicians.updateJsonFiles('musicians.json');

          } else {
            console.log("Invalid musician or band selection.");
          }
        }
      } else {
        console.log("Invalid band or musician selection.");
      }
      break;

    case "6":
      const action = prompt("Do you want to add or remove a band from a musician? (A/R): ").toUpperCase();

      if (action === "A") {
        const bandNameToAdd = prompt("Band Name: ");
        const existingMusician = prompt("Musician Name: ");
        console.log("Band Name to Add: " + bandNameToAdd);
        console.log("Musician Name: " + existingMusician);

        const added = bandAndMusicians.addBandToMusician(existingMusician, bandNameToAdd);
        console.log(added)
        if (added) {
          console.log(added)
          console.log(`${existingMusician} added to ${bandNameToAdd}`);
          bandAndMusicians.updateJsonFiles('musicians.json');
        } else {
          console.log("Invalid musician or band selection.");
        }
      } else if (action === "R") {
        const bandNameToRemove = prompt("Band Name: ");
        const existingMusician = prompt("Musician Name: ");
        console.log("Band Name to Remove: " + bandNameToRemove);
        console.log("Musician Name: " + existingMusician);

        const removed = bandAndMusicians.removeBandFromMusician(existingMusician, bandNameToRemove);

        if (removed) {
          console.log(`${existingMusician} removed from ${bandNameToRemove}`);
          bandAndMusicians.updateJsonFiles('musicians.json');
        } else {
          console.log("Invalid musician or band selection.");
        }
      } else {
        console.log("Invalid action. Use 'A' to add or 'R' to remove.");
      }

      break;

    case "7":
      const bandNameToGetInfoFor = prompt("Band Name: ")
      const bandInformation = bandAndMusicians.getBandInfo(bandNameToGetInfoFor)
      console.log(bandInformation)
      break;
    
    case "8":
      const musicianNameToGetInfoFor = prompt("Musician Name: ")
      const musicianInformation = bandAndMusicians.getMusicianInfo(musicianNameToGetInfoFor)
      console.log(musicianInformation)
      break;
    
    case "E":
      console.log("Program terminated!");
      run = false;
      break;
    default:
      console.log("Invalid choice! Please select between 1 - 7 or E!");
  }
}
