import React from 'react'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Cart from '../Cart'
import { addToCart, removeFromCart, buyFromCart} from "../../redux/actions/cartActions";


const CartScreen = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, messages } = cart;

  useEffect(() => {}, []);

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };

  const checkoutHandler = () => {
    dispatch(buyFromCart());
    alert(messages)
  };


  return (
    <>
        <div className="cartscreen">
            <div className="cartscreen__left">
                <h2>Shopping Cart</h2>

                {cartItems.length === 0 ? (
                    <div>
                      Your Cart Is Empty <Link to="/e-commerce">Go Back</Link>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <Cart
                        key={item.product}
                        item={item}
                        qtyChangeHandler={qtyChangeHandler}
                        removeHandler={removeFromCartHandler}
                      />
                    ))
                  )}
            </div>
            <div className="cartscreen__right">
                <div className="cartscreen__info">
                    <p>Subtotal ({getCartCount()}) items</p>
                    <p>${getCartSubTotal()}</p>
                </div>
                <div>
                    <button onClick={() => checkoutHandler()} disabled={cartItems.length === 0}>
                      Proceed To Checkout
                    </button>
                </div>
            </div>
        </div>    
    </>    
  )
}

export default CartScreen