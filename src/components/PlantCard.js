import React, {useState} from "react";


function PlantCard({plant, deletePlant, setNewPrice, newPrice, elevatorFunction}) {

  const [isInStock, setIsInStock] = useState(true);
  const [editPrice, setEditPrice] = useState(true);
  // const [newPrice, setNewPrice] = useState("")

  const handleSold =( )=> {
    setIsInStock(!isInStock);
  }

  function handleDelete (e){
    deletePlant(plant)
  }

  function handleEditClick (){
    setEditPrice(!editPrice);
  }

  function handlePriceChange (e){
  //  setNewPrice(e.target.value);
   setNewPrice(e.target.value);
  }

  function sendNewPriceUp (){
    elevatorFunction(plant);
    setEditPrice(true);
  }

  

  return (
    <li className="card">
      {plant.image?  <img src={plant.image} alt={plant.name} /> : <img src={"https://via.placeholder.com/400"} alt={plant.name} />}
      <h4>{plant.name}</h4> 
      {editPrice ? 
        <p onClick={handleEditClick}>  Price: {plant.price} <span style={{color: "gray", fontStyle: "italic"}}> &nbsp; Edit Price</span> </p> 
          : <div>
              <input 
              type="text" 
              name="price" 
              placeholder="Price"
              value={ newPrice }
              onChange={handlePriceChange} />
            <button onClick={sendNewPriceUp} type="submit">Edit Price</button>
          </div>
          }
      {isInStock ? 
        (<button onClick={handleSold} className="primary">In Stock</button>) 
        : (<button onClick={handleSold} >Out of Stock</button>)} 
      <button onClick={handleDelete} className="delete">Delete</button>
    </li>
  );
}

export default PlantCard;
