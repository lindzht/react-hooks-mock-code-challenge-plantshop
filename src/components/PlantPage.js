import React, {useEffect, useState} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [plants, setPlants] = useState([]);


  useEffect(() => {
    fetch("http://localhost:6001/plants")
    .then (res => res.json())
    .then ((plantData) => {
      setPlants(plantData)
    })
  }, [])

  function addNewPlant (formData){
    const newPlantArray = [...plants, formData];
    setPlants(newPlantArray);

    fetch("http://localhost:6001/plants", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }})
  }
  

  function searchPlants (result){
    const searchPlantsArray = plants.filter((plants)=> {
      return plants.name.toLowerCase().includes(result.toLowerCase());
    })
    setPlants(searchPlantsArray);
  }

  function deletePlant (doomedPlant){
    const doomedPlantID = doomedPlant.id;

    const newPlantsWithoutDoomedPlants = plants.filter ((plant) => {
      return plant.id !== doomedPlantID
    })

    setPlants(newPlantsWithoutDoomedPlants);
    fetch(`http://localhost:6001/plants/${doomedPlantID}`, {method: "DELETE"})
  }




  return (
    <main>
      <NewPlantForm addNewPlant={addNewPlant}/>
      <Search searchPlants={searchPlants}/>
      <PlantList plants={plants} deletePlant={deletePlant} />
    </main>
  );
}

export default PlantPage;
