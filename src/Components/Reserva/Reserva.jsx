import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import DetalleReserva from "./DetalleReserva";
import "./index.css";

export default function Reserva() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [data, setData] = useState({});
  const [user, setUser] = useState(null);
  const [productSelectedError, setProductSelectedError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [redireccionar, setRedireccionar] = useState(false);
  const [respuestaMessage, setRespuestaMessage] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    if (redireccionar) {
      navigate("/misReservas");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/product/getAll")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("usuario")));
  }, []);

  function handleChange(e) {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  }

  function handleChangeData(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleConsultar() {
    setRedireccionar(false);
    if (!selectedProduct) {
      setProductSelectedError(true);
      return;
    }

    const req = await axios.get(
      `http://localhost:8080/booking/${booking.bookingDate}/${data.product}`
    );
    const flag = await req.data;

    if (flag) {
      setRespuestaMessage("Dia disponible!!! puedes hacer la reserva para el evento elegido");
      openModal();
    } else {
      setRespuestaMessage(
        "Lo sentimos, no es posible hacer una reservación para esas fechas"
      );
      openModal();
    }
    console.log(booking);
    console.log(req.data);
    console.log(flag);
  }

  async function handleReservar() {
    setRedireccionar(false);
    if (!selectedProduct) {
      setProductSelectedError(true);
      return;
    }

    const req = await axios.get(
      `http://localhost:8080/booking/${booking.bookingDate}/${data.product}`
    );
    const flag = await req.data;
    if (flag) {
      await axios
        .post(
          `http://localhost:8080/booking/${user.email}/${data.product}/${booking.bookingDate}/`,
          {}
        )
        .then(() => {
          setRespuestaMessage(
            `Reserva realizada con éxito para ${data.product}, la fecha: ${booking.bookingDate}`
          );
          openModal();
          setRedireccionar(true);
        });
    } else {
      setRespuestaMessage(
        `Lo sentimos, no es posible hacer una reservación para ${data.product}, la fecha: ${booking.bookingDate}`
      );
      openModal();
    }
  }

  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const minDateString = currentDate.toISOString().split("T")[0];
  const maxDateString = maxDate.toISOString().split("T")[0];

  function handleProductSelect(product) {
    setSelectedProduct(product);
    setData({ ...data, product: product.name });
    setProductSelectedError(false);
  }

  return (
    <div className="booking-content">
      <div className="product-cards">
        {products.map((product) => (
          <div
            className={`product-card ${
              selectedProduct === product ? "selected" : ""
            }`}
            key={product.id}
            onClick={() => handleProductSelect(product)}
          >
            <h3>{product.name}</h3>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <p>Precio: $ {product.price}</p>
          </div>
        ))}
      </div>
      <div className="booking-card">
        <h1>Reservaciones</h1>
        <div className="booking-input">
          <h3>Fecha:</h3>
          <input
            type="date"
            name="bookingDate"
            onChange={handleChange}
            min={minDateString}
            max={maxDateString}
          />
        </div>
        {productSelectedError && (
          <p className="error-message">Por favor, seleccione un producto.</p>
        )}
        <div className="simple-button">
          <button className="btn-donate" onClick={handleConsultar}>
            Consultar
          </button>
        </div>
        <div className="simple-button">
          <button className="btn-donate" onClick={handleReservar}>
            Reservar
          </button>
        </div>
        <div className="card-reserva">
          {selectedProduct && <DetalleReserva productId={selectedProduct.id.toString()} />}
        </div>
      </div>
      <Modal
        className="cuadroAlert"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <h2 className="msj"></h2>
        <p>{respuestaMessage}</p>
        <button className="btnForm" onClick={closeModal}>
          Aceptar
        </button>
      </Modal>
    </div>
  );
}
