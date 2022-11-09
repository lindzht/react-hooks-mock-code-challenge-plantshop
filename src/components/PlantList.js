import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, deletePlant, setNewPrice, newPrice, elevatorFunction}) {

  const renderPlants = plants.map((plant)=> {
    return <PlantCard key={plant.id ? plant.id : plant.name } plant={plant} deletePlant={deletePlant} setNewPrice={setNewPrice} newPrice={newPrice} elevatorFunction={elevatorFunction}/>
  })

  // const renderPlants = plants.map((plant)=> {
  //   return <PlantCard key={plant.id} plant={plant} />
  // })

  return (
    <ul className="cards">{renderPlants}</ul>
  );
}

export default PlantList;
