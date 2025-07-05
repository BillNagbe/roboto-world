import { roadGraph } from "./roadGraph.js";
import {helpers} from './helper.js';


 class VillageState {
    constructor(place, parcels) {
      this.place = place; // stores the internal place state
      this.parcels = parcels; // stores the internal parcel state
    }


    move(destination) { // goal to move the robot and check the parcels the robots are carrying
      if(!roadGraph[this.place].includes(destination)){
        return this; // checks to see if the roadGraph place property includes destination
      }
      else {
        let parcels = this.parcels.map(p => {
          if(p.place != this.place) return p; // maps thru the parcels to check if parcels place and robots place are not the same
          return {place: destination, address: p.address}; // else return a object with place property set to destination and address set to p.address
        }).filter(p => p.place != p.address); // if the parcel place and address are not the same
        return new VillageState(destination, parcels); // update the villageState with parcels and destination updated
      }
    }
}


VillageState.random = (parcelCount = 5) => { // static method with inital val set to 5, goal 
  let parcels = []; // parcels set to an empty 
  for(let i = 0; i < parcelCount; i++) { // starts a loop with passed value as stopping condition
    let address = helpers.randomPick(Object.keys(roadGraph)); // returns a random key from the roadGraph
    let place; // place initalized 
    do {
      place = helpers.randomPick(Object.keys(roadGraph)); // set place to a array of roadGraph keys
    } while(place == address); // stop when the place and the address are the same
    parcels.push({place, address}); // push the destructured place and address values into the place array
  }

  return new VillageState("Post Office", parcels); // updates the villageState with the parcel arrays
}



export {VillageState};