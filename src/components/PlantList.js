import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants}) {

  const renderPlants = plants.map((plant)=> {
    return <PlantCard key={plant.id ? plant.id : plant.name } plant={plant} />
  })

  // const renderPlants = plants.map((plant)=> {
  //   return <PlantCard key={plant.id} plant={plant} />
  // })

  return (
    <ul className="cards">{renderPlants}</ul>
  );
}

export default PlantList;
