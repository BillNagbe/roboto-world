const helpers  = {


        randomPick(array) {
        let choice = Math.floor(Math.random() * array.length);
        return array[choice];
        },

        randomRobot(state) {
        return {direction: randomPick(roadGraph[state.place])};
        }
};


export {helpers};

console.log(helpers)