// build graph 

function buildGraph(edges) {
  let graph = Object.create(null); // creates an empty an object
  function addEdge(from, to) {
    if (from in graph) { // loops thru the obj and checks if the key is in the object
      graph[from].push(to); // if the obj key is in the object we assign the to value to that key
    } else {
      graph[from] = [to]; // sets the key property to value  
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to); // add an - mark between points
    addEdge(to, from);
  }
  return graph;
}


export {buildGraph};




