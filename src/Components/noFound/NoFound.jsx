import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './noFoundCss.css'


const NotFound = () => {

    const navigate = useNavigate();

  return (
    <div className='container'>
      <h1  className='titel'>404 - Página no encontrada</h1>
      <p className='message'>La página que estás buscando no existe.</p>
      <p className="message">Haz clic <a href='#' className="link" onClick={() => navigate('/')}>aquí</a> para volver a la página de inicio.</p>
    </div>
  );
};

export default NotFound;