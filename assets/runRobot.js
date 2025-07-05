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

