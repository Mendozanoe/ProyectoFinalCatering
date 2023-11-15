import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Categorias from "./Categorias";
import Recomendaciones from "./Recomendaciones";
import ProductoAleatorio from "./producto-aleatorio/producto-aleatorio";

const categoriasList = [
  { label: "Cocteles", idCategoria: 1, img: "/src/assets/coctelUno.jpg" },
  { label: "Bodas", idCategoria: 2, img: "/src/assets/bodas.jpg" },
  { label: "Empresarial", idCategoria: 3, img: "/src/assets/empresarial.jpg" },
  { label: "Cumpleaños", idCategoria: 4, img: "/src/assets/cumpleanios.jpg" },
];

const Body = () => {
  return (

    <div className="contenido-body">
      
  
      <br></br>
      <br></br>
      <h1 className="titulosBody">Busca por categorías</h1>
      <Categorias categoriasList={categoriasList} />
      <br></br>
      <h1 className="titulosBody">Servicios que vas a encontrar</h1>
      <ProductoAleatorio />

      <h1 className="titulosBody">Que opinan nuestros clientes...</h1>
      <Recomendaciones />


    </div>
  );
};

export default Body;
