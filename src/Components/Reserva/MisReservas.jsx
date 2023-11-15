import React, { useEffect, useState } from "react";
import axios from "axios";
import DetalleReserva from "./DetalleReserva";
import Modal from "react-modal";

const UserInfoWithReservations = () => {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [modifiedDate, setModifiedDate] = useState("");
  const [productDetails, setProductDetails] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);

  useEffect(() => {
    // Obtiene los datos del usuario logueado
    const loggedInUser = JSON.parse(localStorage.getItem("usuario"));
    setUser(loggedInUser);

    // Obtiene las reservas del usuario logueado
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/booking/user/${loggedInUser.id}`
        );
        setReservations(response.data);

        // Obtiene los detalles del producto reservado
        if (response.data.length > 0) {
          const productId = response.data[0].product.id;
          const productResponse = await axios.get(
            `http://localhost:8080/api/v1/product/getById/${productId}`
          );
          setProductDetails(productResponse.data);
        }
      } catch (error) {
        console.log("Error al obtener las reservas:", error);
      }
    };

    fetchReservations();
  }, []);

  const openModal = (reservation) => {
    setReservationToDelete(reservation);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const deleteReservation = async () => {
    try {
      await axios.delete(`http://localhost:8080/bookings/${reservationToDelete.id}`);
      // Actualizar la lista de reservas después de eliminar
      const updatedReservations = reservations.filter(
        (reservation) => reservation.id !== reservationToDelete.id
      );
      setReservations(updatedReservations);
      setSuccessMessage("Reserva cancelada con éxito");
      closeModal();
    } catch (error) {
      console.log("Error al eliminar la reserva:", error);
    }
  };

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    selectedDate.setDate(selectedDate.getDate()); // Adelanta la fecha un día
    const formattedDate = selectedDate.toISOString().split("T")[0];
    setModifiedDate(formattedDate);
  };

  const countReservationsForDate = (date) => {
    return reservations.filter((reservation) => reservation.bookingDate === date).length;
  };

  const countProductReservationsForDate = (date, productId) => {
    return reservations.filter(
      (reservation) => reservation.bookingDate === date && reservation.product.id === productId
    ).length;
  };

  const updateReservation = async (reservationId) => {
    if (!modifiedDate) {
      alert("Por favor, selecciona una fecha antes de actualizar la reserva.");
      return;
    }

    const confirmUpdate = window.confirm("¿Estás seguro de cambiar la fecha de esta reserva?");
    if (confirmUpdate) {
      const countReservations = countReservationsForDate(modifiedDate);
      const countProductReservations = countProductReservationsForDate(
        modifiedDate,
        productDetails.id
      );
      if (countReservations === 0 || (countReservations === 1 && countProductReservations === 1)) {
        try {
          await axios.put(`http://localhost:8080/bookings/${reservationId}`, {
            bookingDate: modifiedDate,
          });
          // Actualizar la lista de reservas después de la actualización
          const updatedReservations = reservations.map((reservation) => {
            if (reservation.id === reservationId) {
              return { ...reservation, bookingDate: modifiedDate };
            }
            return reservation;
          });
          setReservations(updatedReservations);
          setSuccessMessage("Fecha de reserva actualizada con éxito");
        } catch (error) {
          console.log("Error al actualizar la reserva:", error);
        }
      } else {
        alert(
          "No se puede cambiar la fecha de reserva. La fecha seleccionada tiene más de una reserva. Por favor, verifique otra fecha."
        );
      }
    }
  };

  return (
    <div className="userInfoBackground">
      <h1>Mis reservas:</h1>
      {reservations.length > 0 && (
        <div className="reservations">
          {reservations.map((reservation) => (
            <div className="card-mireserva" key={reservation.id}>
              <h3>Fecha de reserva: {reservation.bookingDate}</h3>
              <div>
                {productDetails && (
                  <DetalleReserva productId={reservation.product.id.toString()} />
                )}
              </div>
              <input type="date" onChange={handleDateChange} />
              <button className="btn-donate" onClick={() => updateReservation(reservation.id)}>
                Cambiar fecha de reserva
              </button>
              <button className="btn-donate" onClick={() => openModal(reservation)}>
                Cancelar reserva
              </button>
            </div>
          ))}
        </div>
      )}

      {successMessage && (
        <div className="successMessage">{successMessage}</div>
      )}

      <Modal
      className={"cuadroAlert"}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmar cancelación de reserva"
      >
        <h2>Confirmar cancelación de reserva</h2>
        <p>¿Estás seguro de cancelar esta reserva?</p>
        <div>
          <button className="btn-donate" onClick={deleteReservation}>
            Confirmar
          </button>
          <button className="btn-donate" onClick={closeModal}>
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UserInfoWithReservations;
