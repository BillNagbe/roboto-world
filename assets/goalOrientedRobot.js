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
