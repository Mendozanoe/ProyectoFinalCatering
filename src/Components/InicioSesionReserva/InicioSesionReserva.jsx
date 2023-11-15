import axios from "axios";
import { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import "./style/index.css";

export default function InicioSesionReserva() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [redireccionar, setRedireccionar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    if (redireccionar) {
      navigate("/");
    }
  };

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  async function handleSubmit() {
    setRedireccionar(false);
    await axios
      .get(`http://localhost:8080/api/v1/users/${user.email}`)
      .then((response) =>
        localStorage.setItem("usuario", JSON.stringify(response.data))
      )
      .then(() => {
        if (JSON.parse(localStorage.getItem("usuario"))) {
          if (
            user.password ===
            JSON.parse(localStorage.getItem("usuario")).password
          ) {
            setErrorMessage("Bienvenido");
            openModal();
            setRedireccionar(true);
          } else {
            setErrorMessage(
              "El usuario o contraseña son incorrectos, intenta de nuevo o crea un usuario."
            );
            openModal();
          }
        } else {
          setErrorMessage(
            "El usuario o contraseña son incorrectos, intenta de nuevo o crea un usuario"
          );
          openModal();
        }
      });
  }

  return (
    <div className="inicioReserva">
      <h2>Debes iniciar sesión para reservar</h2>
      <form>
        <div>
          <label>email:</label>
          <input
            name="email"
            type="text"
            placeholder="Escribe tu usuario"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            name="password"
            type="password"
            placeholder="Escribe tu contraseña"
            onChange={handleChange}
          />
        </div>
        <button type="button" className="btnForm" onClick={handleSubmit}>
          Iniciar sesión
        </button>

        <a href="#" onClick={() => navigate("/Registro")}>
          ¿No tienes Cuenta? Registrate
        </a>
      </form>

      <Modal
        className="cuadroAlert"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <p>{errorMessage}</p>
        <button className="btnForm" onClick={closeModal}>
          Cerrar
        </button>
      </Modal>
    </div>
  );
}
