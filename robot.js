// helper functions

function randomizor(array) {
    return array[Math.floor(Math.random() * array.length)];
}


// Town enivorment 

const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];


// build graph 

function buildGraph(edges) {
  let graph = Object.create(null); // creates an empty an object
  function addEdge(from, to) {
    if (from in graph) { // loops thru the array
      graph[from].push(to); // assigns the from element in the graph object as a property which should be an array that holds the inital start point (from) and the end point(to)
    } else {
      graph[from] = [to]; // sets the from property equal to the to 
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to); // add an - mark between points
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads); // builds a graph or world for our village

// Village class 

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
          return {place: destination, address: p.address}; // if not return a object with place property set to destination and address set to p.address
        }).filter(p => p.place != p.address); // if the parcel place and address are not the same
        return new VillageState(destination, parcels); // update the villageState with parcels and destination updated
      }
    }
}


// run Robot 

function runRobot(state, robot, memory) { // goal to make the robot move
  for (let turn = 0; ;turn++) { // starts a endless loop
    if (state.parcels.length == 0) { // checks state parcel length value
      console.log(`Done in ${turn} turns`); // prints out when the loop is done
      break;
    }
    let action = robot(state, memory); // calls the robot function with a current state and memory 
    state = state.move(action.direction); // state variable moves in the direction within the action property
    memory = action.memory; // memory set to the memory property with in action
    console.log(`Moved to ${action.direction}`); // prints the direction for the robot to move in
  }
}


// returns a random direction from the robo

function randomRobot(state) {
  return {direction: randomizor(roadGraph[state.place])};
}


