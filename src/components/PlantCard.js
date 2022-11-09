import React, {useState} from "react";


function PlantCard({plant, deletePlant}) {

  const [isInStock, setIsInStock] = useState(true);

  const handleSold =( )=> {
    setIsInStock(!isInStock);
  }

  function handleDelete (e){
    deletePlant(plant)
  }


  return (
    <li className="card">
      {plant.image?  <img src={plant.image} alt={plant.name} /> : <img src={"https://via.placeholder.com/400"} alt={plant.name} />}
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {isInStock ? (
        <button onClick={handleSold} className="primary">In Stock</button>
      ) : (
        <button onClick={handleSold} >Out of Stock</button>
      )} 
      <button onClick={handleDelete} className="delete">Delete</button>
    </li>
  );
}

export default PlantCard;
