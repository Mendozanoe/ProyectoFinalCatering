import React, { useEffect, useState } from 'react';
import img from "../assets/logo3.png"
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [flag, setFlag] = useState(true);
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem('usuario');
    navigate("/");
    setFlag(true);
  }

  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const rol = usuario ? usuario.role : null;

  useEffect(() => {
    if (usuario) {
      setFlag(false);
    }
  }, [usuario]);

  return (
    <header>
      <a href='#' className='logoPrincipal' onClick={() => navigate('/')}>
        <img src={img} alt="" />
      </a>
      <a href="#" onClick={() => navigate('/')}>
        <h2>Celebra la vida, celebra con nosotros...</h2>
      </a>
      {flag ? (
        <div className='contenedorBtn'>
          <button className='btn-donate' onClick={() => navigate('/registro')}>
            Crear cuenta
          </button>
          <button className='btn-donate' onClick={() => navigate('/inicio')}>
            Iniciar sesión
          </button>
        </div>
      ) : (
        <div className='contenedorBtn'>
          <div className='avatar'>
            <a href="#" onClick={() => navigate('/userInfo')}>
              <h2>{usuario.userName.substring(0, 1).toUpperCase()}</h2>
            </a>
          </div>
          {rol === 'user' && (
            <>
              <button className='btn-donate' onClick={() => navigate('/misReservas')}>
                Mis Reservas
              </button>
            </>
          )}
          {rol === 'admin' && (
            <>
              <button className='btn-donate' onClick={() => navigate('/misReservas')}>
                Mis Reservas
              </button>
              <button className='btn-donate' onClick={() => navigate('/eliminarProducto')}>
                Eliminar producto
              </button>
              <button className='btn-donate' onClick={() => navigate('/altaproducto')}>
                Agregar de producto
              </button>
            </>
          )}
          {rol === 'root' && (
            <>
            <button className='btn-donate' onClick={() => navigate('/misReservas')}>
                Mis Reservas
              </button>
              <button className='btn-donate' onClick={() => navigate('/altaproducto')}>
                Agregar de producto
              </button>
              <button className='btn-donate' onClick={() => navigate('/eliminarProducto')}>
                Eliminar producto
              </button>
              <button className='btn-donate' onClick={() => navigate('/rolesPermisos')}>
                Gestion de roles
              </button>
            </>
          )}
          <button className='btn-donate' onClick={logOut}>
            Cerrar sesión
          </button>
        </div>
      )}
    </header>
  );
}

