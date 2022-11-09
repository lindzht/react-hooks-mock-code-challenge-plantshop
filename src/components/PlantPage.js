import React, {useEffect, useState} from "react";
import EditPlantForm from "./EditForm";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [plants, setPlants] = useState([]);
  const [newPrice, setNewPrice] = useState("")

  console.log(newPrice);

  useEffect(() => {
    fetch("http://localhost:6001/plants")
    .then (res => res.json())
    .then ((plantData) => {
      setPlants(plantData)
    })
  }, [newPrice])

  function addNewPlant (formData){
    const newPlantArray = [...plants, formData];
    
    fetch("http://localhost:6001/plants", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }})

    setPlants(newPlantArray);
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

  function elevatorFunction (plantToEditPrice) {
    console.log(plantToEditPrice);
    console.log(newPrice);

    fetch(`http://localhost:6001/plants/${plantToEditPrice.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        price: newPrice
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then (newData => {
      const newArrayWithUpdatedPrice = plants.filter((plant) => {
        if (newData.id === plant.id) {
          return newData;
        } else {
          return true;
        }
      });
     setPlants(newArrayWithUpdatedPrice);
    } 
    )
  }




  return (
    <main>
      <NewPlantForm addNewPlant={addNewPlant}/>
      <Search searchPlants={searchPlants}/>
      <PlantList plants={plants} deletePlant={deletePlant} setNewPrice={setNewPrice} newPrice={newPrice} elevatorFunction={elevatorFunction} />
    </main>
  );
}

export default PlantPage;
