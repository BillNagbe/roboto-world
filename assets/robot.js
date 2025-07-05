// helper functions

function randomizor(array) { // goal to return a random value based on the passed array
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
    if (state.parcels.length == 0) { // checks state parcels length value
      console.log(`Done in ${turn} turns`); // prints out when the loop is done
      break; // exit the loop
    }
    let action = robot(state, memory); // calls the passed function with a current point and prevs points 
    state = state.move(action.direction); // passed object move property is called with the action direction
    memory = action.memory; // set prevs state to the current state
    console.log(`Moved to ${action.direction}`); // prints the direction the object is expected to move in
  }
}


// returns a random direction from the robo

function randomRobot(state) { // goal checks for the direction of robots state with in the roadGraph
  return {direction: randomizor(roadGraph[state.place])}; // returns random direction 
}


//


VillageState.random = (parcelCount = 5) => { // static method with inital val set to 5, goal 
  let parcels = []; // parcels set to an empty 
  for(let i = 0; i < parcelCount; i++) { // starts a loop with passed value as stopping condition
    let address = randomizor(Object.keys(roadGraph)); // returns a random key from the roadGraph
    let place; // place initalized 
    do {
      place = randomizor(Object.keys(roadGraph)); // set place to a array of roadGraph keys
    } while(place == address); // stop when the place and the address are the same
    parcels.push({place, address}); // push the destructured place and address values into the place array
  }

  return new VillageState("Post Office", parcels); // updates the villageState with the parcel arrays
}

// mail route array

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];


function routeRobot(state, memory) { // goal to make the robot route
  if(memory.length == 0) { memory = mailRoute}; // if the passed variable length member is 0 return the mailRoute 
  return {direction: memory[0], memory: memory.slice(1)}; // 
}


function findRoute(graph, from, to) { // finds a route  from a graph[world] using the current[from] location to a destination[to]
  let work = [{at: from, route: []}]; // data structure to pass values to
  for(let i = 0; i < work.length; i++) { // for loop based on the passed values length member
    let {at, route} = work[i]; // destructures the data structure 
    for(let place of graph[at]) { // loops thru the at property in the passed graph value
      if(place == to) return route.concat(place); // if the current value equals the inital passed value add the current value to the route
      if(!work.some(w => w.at == place)) { // if not true 
        work.push({at: place, route: route.concat(place)}); // push another set of data to the data structure we create at the start
      }
    }
  }
}

function goalOrientedRobot({place, parcels}, route) { // to check if a route has been found and update internal state 
    if(route.length === 0) { // if the passed variable length member is 0
      let parcel = parcels[0]; // first item of the passed object variable
      if(parcel.place != place) { // if not true
        route = findRoute(roadGraph, place, parcel.place); // set the passed variable using a helper function to update internal state
      }
      else {
        route = findRoute(roadGraph, place, parcel.address); // set the passed variable using a helper function to update internal state
      }
    }
    return {direction: route[0], memory: route.slice(1)}; // returns an object with an updated internal state
}



function compareRobots(robot1, memory1, robot2, memory2) {
    let task, steps;
    if(memory.length == 0) { memory = mailRoute}; 
    return {direction: memory[0], memory: memory.slice(1)};
}


runRobot(VillageState.random(), goalOrientedRobot, []);