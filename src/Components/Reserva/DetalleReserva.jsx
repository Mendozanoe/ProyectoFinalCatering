import React, { useEffect, useState } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';

export default function DetalleReserva({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchData();
  }, [productId]);

  async function fetchData() {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/product/getById/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  }

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Descripción: {product.description}</p>
      <img src={product.image} alt="ImgProduct" className="product-image" />
      <p>Precio: $ {product.price}</p>
    </div>
  );
}

DetalleReserva.propTypes = {
  productId: PropTypes.string.isRequired
};


