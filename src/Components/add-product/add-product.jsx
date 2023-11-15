import React, { useState } from 'react';
import "./add-product.css"

const AgregarProducto = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0);
  const [nombreFoto, setNombreFoto] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar si el nombre de la foto ya existe en la base de datos
    const existeFoto = validarNombreFoto(nombreFoto);

    if (existeFoto) {
      setError('El nombre de la foto ya existe en la base de datos');
      return;
    }

    // Aquí puedes realizar la lógica para enviar los datos a la base de datos
    // utilizando una API o cualquier otro método de almacenamiento

    // Resetear los campos después de agregar el producto
    setNombre('');
    setDescripcion('');
    setPrecio(0);
    setNombreFoto('');
    setError('');
  };

  const validarNombreFoto = (nombreFoto) => {
    // Realiza la lógica de validación para verificar si el nombre de la foto ya existe en la base de datos
    // Puedes utilizar una petición a la API o cualquier otro método de validación
    // Aquí, como ejemplo, simplemente comprobaremos si el nombre de la foto es "foto1"

    return nombreFoto === 'foto1';
  };

  return (
    <div className='container'>
      <h2>Agregar Producto</h2>
      <form className='container-form' onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>
        <div>
          <label>Nombre de la Foto:</label>
          <input
            type="text"
            value={nombreFoto}
            onChange={(e) => setNombreFoto(e.target.value)}
          />
        </div>
        {error && <p className='error'>{error}</p>}
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
};

export default AgregarProducto;