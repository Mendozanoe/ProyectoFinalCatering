import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';



export default function UserForm() {
  const [user, setUser] = useState({ role: 'user' });
  const [registrationMessage, setRegistrationMessage] = useState('');
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleFormSubmit() {
    if (user.name.length < 4) {
      setErrorMessage('Por favor ingresa un nombre válido.');
      openModal();
    } else if (user.lastName.length < 4) {
      setErrorMessage('Por favor ingresa un apellido válido.');
      openModal();
    } else if (!user.email.includes('@')) {
      setErrorMessage('Por favor ingresa un email válido.');
      openModal();
    } else if (!user.email.includes('.com')) {
      setErrorMessage('Por favor ingresa una extensión válida.');
      openModal();
    } else if (!user.userName) {
      setErrorMessage('Por favor ingresa un nombre de usuario válido.');
      openModal();
    } else if (!user.password) {
      setErrorMessage('Por favor ingresa una clave válida.');
      openModal();
    } else {
      await axios.post('http://localhost:8080/api/v1/users/create', user).then((response) => {
        console.log(response.status);
      });
      setRegistrationMessage(
        '¡Chequea tu correo electrónico para confirmar tu cuenta!'
      );
    }
  }

  if (registrationMessage) {
    return (
      <div>
        <h2>Genial </h2>
        <p>{registrationMessage}</p>
        <button className="btnForm" onClick={handleAccept}>Aceptar</button>
      </div>
    );
  }

  function handleAccept() {
    navigate('/');
  }

  return (
    <div className='contenedorFormulario'>
      <h2>Crear cuenta</h2>
      <form>
        <div>
          <label>Nombre:</label>
          <input
            className='datos'
            name='name'
            placeholder='Escribe tu nombre'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            className='datos'
            name='lastName'
            placeholder='Escribe tu apellido'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            className='datos'
            name='email'
            placeholder='Escribe tu email'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className='usuario'>Nombre de usuario:</label>
          <input
            name='userName'
            type='text'
            placeholder='Escribe un nombre de usuario'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className='usuario'>Contraseña:</label>
          <input
            name='password'
            type='password'
            placeholder='Escribe una contraseña'
            onChange={handleChange}
            required
          />
        </div>
        <button type='button' className='btnForm' onClick={handleFormSubmit}>
          Enviar
        </button>
        {registrationMessage ? null : <p>Para empezar debes registrarte</p>}
        <Modal className="cuadroAlert" isOpen={modalIsOpen} onRequestClose={closeModal}>
          <h2 className='msj'>Atencion</h2>
          <p >{errorMessage}</p>
          <button className='btnForm' onClick={closeModal}>Cerrar</button>
        </Modal>
      </form>
    </div>
  );
}
