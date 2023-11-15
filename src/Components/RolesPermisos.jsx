import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/users/getAll"
      );
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await axios.put(`http://localhost:8080/api/v1/users/user/${id}/role`, {
        role,
      });
      setErrorMessage("User role updated successfully");
      openModal();
      const updatedUsers = users.map((user) => {
        if (user.id === id) {
          return { ...user, role };
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rolesBackground">
      <h1>Lista de usuarios</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por nombre de usuario"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre de usuario</th>
            <th>Correo</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="root">Admin</option>
                  <option value="user">User</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        className="cuadroAlert"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <h2 className="msj">Atención</h2>
        <p>{errorMessage}</p>
        <button className="btnForm" onClick={closeModal}>
          Cerrar
        </button>
      </Modal>
    </div>
  );
}
