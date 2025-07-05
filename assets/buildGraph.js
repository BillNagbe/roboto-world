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




