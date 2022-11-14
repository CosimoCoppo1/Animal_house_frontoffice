import * as actionTypes from "../constants/cartConstants";

const CART_INITIAL_STATE = {
  cartItems: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);  //se si trova l'ID del prodotto già nel carrello ritorna true

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x     //item: nuovo item trovato, x: item corrente attrverso il quale si sta mappando
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case actionTypes.BUY_THE_CART:
      const {result, msg} = action.payload

      if(result === 0){
        return {
          ...state,
          cartItems: [], 
          messages: msg
        };    
      }else{
        return {
          ...state,
          cartItems: state.cartItems, 
          messages: msg
        }
      }
      
    default:
      return state;
  }
};