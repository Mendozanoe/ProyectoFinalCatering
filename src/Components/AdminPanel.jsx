import React, { useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setProductDescription(event.target.value);
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validación de campos obligatorios
    if (!productName || !productDescription || !imageUrl) {
      setErrorMessage("Todos los campos son obligatorios");
      return;
    }
  
    const productData = {
      name: productName,
      description: productDescription,
      image: imageUrl,
    };
  
    try {
      const response = await axios.post("http://localhost:8080/api/v1/product/create", productData);
      setSuccessMessage("Producto agregado exitosamente");
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de error
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        setErrorMessage("Error al agregar el producto: " + error.response.data.message);
      } else if (error.request) {
        // La solicitud fue realizada pero no se recibió respuesta
        console.log(error.request);
        setErrorMessage("Error al realizar la solicitud: no se recibió respuesta del servidor");
      } else {
        // Ocurrió un error al configurar la solicitud
        console.log("Error", error.message);
        setErrorMessage("Error al configurar la solicitud: " + error.message);
      }
      console.error(error);
    }
    
  
    setProductName("");
    setProductDescription("");
    setImageUrl("");
  };
  

  return (
    <div className="rolesBackground">
      <h1>Agregar Producto</h1>
      <form onSubmit={handleSubmit}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div>
          <label htmlFor="productName">Nombre:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="productDescription">Descripción:</label>
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={handleDescriptionChange}
          />
        </div>
        <div>
          <label htmlFor="imageUrl">URL de la imagen:</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={handleImageUrlChange}
          />
        </div>
        <button className="btnForm" type="submit">Agregar Producto</button>
      </form>
    </div>
  );
};

export default AdminPanel;
