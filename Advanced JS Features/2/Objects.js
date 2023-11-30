// Let's create an object representing a fluffy bunny
const bunny = {
    name: "Fluffy",
    color: "White",
    friends: ["Cotton", "Buttercup", "Mochi"],
    age: 2,
    hop: function() {
      console.log("Hopping around happily!");
    },
    eatCarrot: function() {
      console.log("Nom nom nom, enjoying a tasty carrot.");
    },
    play: function(friend) {
        console.log(`Yey! Chasing ${friend} around the play pen.`)
    }
  };
  
  // Accessing bunny's properties using dot notation
  console.log(`Meet ${bunny.name}, the ${bunny.color} bunny who is ${bunny.age} years old. `);
  
  // Calling bunny's methods using dot notation
  bunny.hop();
  bunny.eatCarrot();
  bunny.play(bunny.friends[0]);
  