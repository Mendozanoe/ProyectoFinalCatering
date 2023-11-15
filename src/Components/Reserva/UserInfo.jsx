import "./index.css";
import React, { useEffect, useState } from "react";


const UserInfoWithReservations = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Obtiene los datos del usuario logueado
    const loggedInUser = JSON.parse(localStorage.getItem("usuario"));
    setUser(loggedInUser);


  });

  return (
    <div className="userInfos">
      {user && (
        <div className="userInfo">
          <h2>Informacion del usuario</h2>
          <div className="info">
            <h2>Nombre:</h2>
            <h2>{user.name}</h2>
          </div>
          <div className="info">
            <h2>Apellido:</h2>
            <h2>{user.lastName}</h2>
          </div>
          <div className="info">
            <h2>Usuario:</h2>
            <h2>{user.userName}</h2>
          </div>
          <div className="info">
            <h2>Correo:</h2>
            <h2>{user.email}</h2>
          </div>
          <div className="info">
            <h2>Contraseña:</h2>
            <h2>{user.password}</h2>
          </div>
          <div className="info">
            <h2>Rol del usuario:</h2>
            <h2>{user.role}</h2>
          </div>
        </div>
        
      )}
    </div>
  );
};

export default UserInfoWithReservations;









