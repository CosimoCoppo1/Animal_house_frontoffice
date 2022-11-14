import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../redux/actions/productActions";
import { addToCart } from "../../redux/actions/cartActions";

const ProductScreen = () => {

  const { id } = useParams();    
  const navigate = useNavigate()

  const [qty, setQty] = useState(0);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (product && id !== product._id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id, product]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    navigate(`/cart`);
  };
  return (
    <div className="productscreen">
        {loading ? (
            <h2>Loading...</h2>
        ) : error ? (
            <h2>{error}</h2>
        ) : (
            <>
                <div className="productscreen__left">
                    <div className="left__image">
                        <img src={product.image} alt={product.title} />
                    </div>
                    <div className="left__info">
                        <p className="left__name">{product.title}</p>
                        <p>Price: ${product.price}</p>
                        <p>Description: {product.description}</p>
                    </div>
                </div>
                <div className="productscreen__right">
                    <div className="right__info">
                        <p>
                            Price:
                            <span>${product.price}</span>
                        </p>
                        <p>
                            Status:
                            <span>
                                {product.pieces_left > 0 ? "In Stock" : "Out of Stock"}
                            </span>
                        </p>
                        <p>
                            Qty
                            <span>
                                {(product.pieces_left > 0) ? (
                                    <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                        {[...Array(product.pieces_left).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p></p>                                
                                )}
                            </span>
                            
                        </p>
                        <p>
                            <button type="button" onClick={addToCartHandler} disabled={qty === 0}>
                            Add To Cart
                            </button>
                        </p>
                    </div>                
                </div>
            </>
        )}
    </div>
  )
}

export default ProductScreen