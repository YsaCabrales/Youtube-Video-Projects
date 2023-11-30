// Define the apparel items using objects
const tshirt = {
    name: "White Graphic T-shirt",
    category: "Top",
    quantity: 50,
  };
  
  const jeans = {
    name: "Blue Denim Jeans",
    category: "Bottom",
    quantity: 30,
  };
  
  const sneakers = {
    name: "Black Sneakers",
    category: "Shoes",
    quantity: 40,
  };
  
  // Create an array to hold our apparel items
  const apparelInventory = [tshirt, jeans, sneakers];
  
  // Function to display the inventory using dot notation
  function displayInventory(item) {
    console.log(`Item: ${item.name}, Category: ${item.category}, Quantity: ${item.quantity}`);
  }
  
  // Function to add new items to the inventory
  function addItem(name, category, quantity) {
    const newItem = {
      name,
      category,
      quantity,
    };
    apparelInventory.push(newItem);
  }
  
  // Let's display the initial inventory
  console.log("Initial Inventory:");
  apparelInventory.forEach(displayInventory);
  
  // Add a fabulous new item
  addItem("Chic Sunglasses", "Accessories", 20);
  
  // Display the updated inventory
  console.log("\nUpdated Inventory:");
  apparelInventory.forEach(displayInventory);
  