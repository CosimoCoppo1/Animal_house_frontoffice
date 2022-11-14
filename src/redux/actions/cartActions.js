import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/products/front/${id}`);

  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      product: data._id,
      title: data.title,
      image: data.image,
      price: data.price,
      pieces_left: data.pieces_left,
      qty,
    },
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {  
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const buyFromCart = () => async (dispatch, getState) => {
  const cartItemsToBuy = JSON.parse(localStorage.getItem("cart"));
    
  axios.post(`/products/buy-from-cart`, {cartItemsToBuy})    
  .then(function (data) {
    
    dispatch({
      type: actionTypes.BUY_THE_CART,
      payload: data.data
    });
      
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  })
  .catch(function (err) {
    console.log(err);
  });   
};