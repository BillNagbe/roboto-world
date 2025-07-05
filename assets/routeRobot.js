function routeRobot(state, memory) { // goal to make the robot route
  if(memory.length == 0) { memory = mailRoute}; // if the passed variable length member is 0 return the mailRoute 
  return {direction: memory[0], memory: memory.slice(1)}; // 
}
