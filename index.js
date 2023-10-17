import PromptSync from "prompt-sync";
import BandsAndMusicians from "./manageBandsAndMusicians.js";

const prompt = PromptSync({ sigint: true });
const bandAndMusicians = new BandsAndMusicians();



// Start Meny
let run = true;
while (run) {
  console.log(`
Meny

1. Create a band
2- Remove a band
3- Create a musician
4- Remove a musician
5- Add/remove musician from band
6- Add/remove band from musician
A. Avsluta programmet

Val ->`);
  const val = prompt();

  switch (val.trim().toUpperCase()) {
    case "1":
      const bandName = prompt("Band Name: ");
      const bandInfo = prompt("Band Info: ");
      console.log("creating a band");
      const band1 = bandAndMusicians.createBand(bandName, bandInfo);
      //console.log(band1)
      bandAndMusicians.updateJsonFile()
      break;
    case "2":
      break;
    case "3":
      break;
    case "4":
      break;
    case "A":
      console.log("Programmet avslutas!");
      run = false;
      break;
    default:
      console.log("Du måste välja mellan 1 - 6 eller A!");
  }
}