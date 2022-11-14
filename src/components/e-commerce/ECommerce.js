import React from 'react'
import Product from '../Product'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts as listProducts } from "../../redux/actions/productActions"


const ECommerce = () => { 
  
    const dispatch = useDispatch();

    const getProducts = useSelector((state) => state.getProducts);
    const { products, loading, error } = getProducts;

    useEffect(() => {
      dispatch(listProducts());
    }, [dispatch]);

    return ( 
      <div className="homescreen">
        <h2 className="homescreen__title">Latest Products</h2>
        <div className="homescreen__products">
          {loading ? (
            <h2>Loading...</h2>
          ) : error ? (
            <h2>{error}</h2>
          ) : (
            products.map((product) => (
              <Product
                key={product._id}
                title={product.title}
                description={product.description}
                price={product.price}
                image={product.image}
                productId={product._id}
              />
            ))
          )}
        </div>
      </div>     
    )  
}

export default ECommerce