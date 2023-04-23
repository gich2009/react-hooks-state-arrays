import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All");

  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    console.log(newFood);
    const newFoodArray = [...foods, newFood];
    setFoods(newFoodArray);
  }

  //Deleting an element in an array using setState. Uncomment out and comment out the updating function to see the functionality.
  // function handleLiClick(id){
  //   const newFoodArray = foods.filter((food) => {
  //     return food.id !== id;
  //   });

  //   setFoods(newFoodArray);
  // }

  //Updating an element in an array using setState.
  function handleLiClick(id){
    const newFoodArray = foods.map((food) => {
      if(food.id === id){
        const newFood = {...food, heatLevel: food.heatLevel + 1};
        return newFood;
      } else{
        return food;
      }
    });

    console.log(newFoodArray);

    setFoods(newFoodArray);
  }

  function handleFilterChange(event){
    setFilterBy((filterBy) => event.target.value);
  }


  //Chained two methods, one to enable the filter for the data and the other to construct the array of jsx elements.
  const foodList = foods.filter((food) => {
    if (filterBy === "All"){
      return true;
    }else{
      console.log(filterBy);
      console.log(food.cuisine);
      console.log(food.cuisine === filterBy);
      return food.cuisine === filterBy;
    }
  }).map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ))


  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <select name="filter" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
