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