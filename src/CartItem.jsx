import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem
} from "./CartSlice";

function CartItem({ onContinueShopping }) {

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleIncrement = (name) => {
    dispatch(incrementQuantity(name));
  };

  const handleDecrement = (name) => {
    dispatch(decrementQuantity(name));
  };

  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.replace("$", ""));
    return (price * item.quantity).toFixed(2);
  };

  const calculateCartTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.cost.replace("$", ""));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} width="100" />
              <h3>{item.name}</h3>
              <p>Price: {item.cost}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${calculateTotalCost(item)}</p>

              <button onClick={() => handleIncrement(item.name)}>+</button>
              <button onClick={() => handleDecrement(item.name)}>-</button>
              <button onClick={() => handleRemove(item.name)}>
                Remove
              </button>

              <hr />
            </div>
          ))}

          <h3>Total Cart Amount: ${calculateCartTotal()}</h3>
        </>
      )}

      <button onClick={onContinueShopping}>
        Continue Shopping
      </button>
    </div>
  );
}

export default CartItem;

