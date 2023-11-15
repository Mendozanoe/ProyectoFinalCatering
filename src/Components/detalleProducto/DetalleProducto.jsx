import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./DetalleProducto.css";
import CardMedia from "@mui/material/CardMedia";
import StarRating from "../rating-star/rating-star";
import CaracteristicaProducto from "../caracteristicasProducto/CaracteristicaProducto";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ModalVerMas from "../modal-ver-mas/ModalVerMas";
import { Carousel } from "react-carousel-minimal";

const DetalleProducto = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const producto = location.state;
  const [mostrarMas, setMostrarMas] = useState(false);
  const imagenesCarrusel = [
    { image: "https://tse3.mm.bing.net/th?id=OIP.57NXK8azb7c20uNnoKQuAAHaE7&pid=Api&P=0&h=180", caption: "Calidad" },
    { image: "https://tse1.mm.bing.net/th?id=OIP.xOUIjZCPPSS3o2dLHXIwAwHaE8&pid=Api&P=0&h=180", caption: "Excelencia" },
    { image: "https://tse2.mm.bing.net/th?id=OIP.4J9mc0fbBdc2Sof0TO9q5AHaE8&pid=Api&P=0&h=180", caption: "Buenos momentos" },
    { image: "https://tse1.mm.bing.net/th?id=OIP.A5y6BvX8dcRif-L-Wtva2gHaE8&pid=Api&P=0&h=180", caption: "Diversion" },
    
  ];

  return (
    <div className="detailContainer">
      <div className="backIcon">
        <Link to="/">
          <ArrowBackIcon fontSize="large" />
        </Link>
      </div>
      <div className="imagenesContenedor">
        <div className="imagenPrincipal">
          <CardMedia
            component="img"
            alt={producto.nombre}
            image={producto.url}
            title={producto.nombre}
          />
        </div>
        <div className="imagenSecundaria">
          {imagenesCarrusel.map((imagen, index) => (
            <CardMedia
              component="img"
              key={index}
              alt={imagen.caption}
              image={imagen.image}
              title={imagen.caption}
            />
          ))}
        </div>
        <button className="botonDetalle" onClick={() => setMostrarMas(true)}>
          Ver Más
        </button>
      </div>
      <ModalVerMas
        title="Galeria de Imagenes"
        onClose={() => setMostrarMas(false)}
        show={mostrarMas}
      >
        <Carousel
          data={imagenesCarrusel}
          time={2000}
          width="100%"
          height="100%"
          radius="10px"
          slideNumber={true}
          captionPosition="bottom"
          automatic={true}
          dots={true}
          pauseIconColor="white"
          pauseIconSize="40px"
          slideBackgroundColor="darkgrey"
          slideImageFit="cover"
          thumbnails={true}
          thumbnailWidth="100px"
          style={{
            textAlign: "center",
            maxWidth: "850px",
            maxHeight: "400px",
            margin: "0 auto",
          }}
        />
      </ModalVerMas>
      <button className="btn-donate" onClick={() => navigate("/reserva")}>
        Reservar
      </button>
      <StarRating />
      <CaracteristicaProducto detalle={producto} />
    </div>
  );
};

export default DetalleProducto;

