import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./eliminarProducto.css";

const columns = [
  { id: "id", label: "Código", minWidth: 50 },
  { id: "name", label: "Nombre", minWidth: 100 },
  { id: "description", label: "Descripción", minWidth: 100 },
];

function createData(id, name, description, image) {
  return { id, name, description, image };
}

const EliminarProducto = () => {
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [flagDelete, setFlagDelete] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  async function fetchData() {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/product/getAll"
      );
      console.log(response.data);
      setRows(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  }

  async function deleteData(id) {
    try {
      await axios.delete(`http://localhost:8080/api/v1/product/delete/${id}`);
      setErrorMessage("Producto eliminado satisfactoriamente");
      openModal();
      setFlagDelete(!flagDelete);
    } catch (error) {
      console.error("Error al eliminar el producto:", error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, [flagDelete]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="tableContainer">
      <Paper sx={{ width: "90%" }}>
        <TableContainer sx={{ maxHeight: 580 }}>
          <Table aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>
                        <img
                          src={row.image}
                          alt="Imagen del producto"
                          style={{ width: "270px", height: "180px" }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => deleteData(row.id)}>
                          <DeleteForeverIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Páginas"
        />
      </Paper>
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
};

export default EliminarProducto;
