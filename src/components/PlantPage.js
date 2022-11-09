import React, {useEffect, useState} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [plants, setPlants] = useState([]);
  const [newPrice, setNewPrice] = useState("")
  const [searchText, setSearchText] = useState("")


  useEffect(() => {
    fetch("http://localhost:6001/plants")
    .then (res => res.json())
    .then ((plantData) => {
      setPlants(plantData)
    })
  }, [])

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
  
  //
  const searchPlantsArray = plants.filter((plants)=> {
    return plants.name.toLowerCase().includes(searchText.toLowerCase());
  })

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

    plantToEditPrice.price = newPrice;
    
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
      console.log(newData);
    } 
    )
  }



  return (
    <main>
      <NewPlantForm addNewPlant={addNewPlant}/>
      <Search  searchText={searchText} setSearchText={setSearchText}/>
      <PlantList plants={searchPlantsArray} deletePlant={deletePlant} setNewPrice={setNewPrice} newPrice={newPrice} elevatorFunction={elevatorFunction} />
    </main>
  );
}

export default PlantPage;
