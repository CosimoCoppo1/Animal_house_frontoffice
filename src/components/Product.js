import React from 'react'
import { Link } from "react-router-dom"

const Product = ({ image, description, price, title, productId }) => {
  return (
    <div className="product">
      <img src={image} alt={title} />

      <div className="product__info">
        <p className="info__name">{title}</p>

        <p className="info__description">{description.substring(0, 100)}...</p>

        <p className="info__price">${price}</p>

        <Link to={`/products/${productId}`} className="info__button">
          View
        </Link>
      </div>
    </div>
  )
}

export default Product