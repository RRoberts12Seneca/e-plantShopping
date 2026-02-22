import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './ProductList.css';
import CartItem from './CartItem';
import { addItem } from './CartSlice';

function ProductList() {

  const dispatch = useDispatch();

  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$150"
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$120"
        }
      ]
    }
  ];

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleAddToCart = (plant) => {
    dispatch(addItem({
      name: plant.name,
      image: plant.image,
      cost: plant.cost
    }));

    setAddedToCart(prev => ({
      ...prev,
      [plant.name]: true
    }));
  };

  return (
    <div>

      {/* NAVBAR */}
      <div className="navbar" style={{
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px'
      }}>

        <div>
          <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
        </div>

        <div>
          <a href="#" onClick={handleCartClick} style={{ color: 'white', textDecoration: 'none' }}>
            🛒 View Cart
          </a>
        </div>

      </div>

      {/* CONDITIONAL RENDERING */}
      {!showCart ? (

        <div className="product-grid">

          {plantsArray.map((category, index) => (
            <div key={index}>
              <h1>{category.category}</h1>

              <div className="product-list">

                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <div className="product-title">{plant.name}</div>
                    <div className="product-description">{plant.description}</div>
                    <div className="product-cost">{plant.cost}</div>

                    <button
                      className="product-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? "Added" : "Add to Cart"}
                    </button>

                  </div>
                ))}

              </div>
            </div>
          ))}

        </div>

      ) : (

        <CartItem onContinueShopping={handleContinueShopping} />

      )}

    </div>
  );
}

export default ProductList;

