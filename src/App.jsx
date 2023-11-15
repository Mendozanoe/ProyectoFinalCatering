import {Suspense} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import Registro from "./Components/Registro";
import InicioSesion from "./Components/InicioSesion";
import UserInfo from "./Components/Reserva/UserInfo";
import DetalleProducto from "./Components/detalleProducto/DetalleProducto";
import RolesPermisos from "./Components/RolesPermisos";
import EliminarProducto from "./Components/eliminarProducto/EliminarProducto";
import AdminPanel from "./Components/AdminPanel";
import NotFound from "./Components/noFound/NoFound";
import ProtectedRoute from "./router/ProtectedRoute/ProtectedRoute";
import Reserva from "./Components/Reserva/Reserva";
import InicioSesionReserva from "./Components/InicioSesionReserva/InicioSesionReserva";
import MisReservas from "./Components/Reserva/MisReservas"





function App() {
  return (
    <div>
      <BrowserRouter>
      <Suspense fallback={<>CARGANDO...</>}>
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/inicioReserva" element={<InicioSesionReserva />} />
          <Route path="/inicio" element={<InicioSesion />} />
          <Route path="/userInfo" element={<ProtectedRoute rol={["admin", "user", "root"]}><UserInfo /></ProtectedRoute>} />
          <Route path="/detalleProducto" element={<DetalleProducto />} />
          <Route path="/reserva" element={<ProtectedRoute rol={["admin", "user", "root"]}><Reserva /></ProtectedRoute>} />
          <Route path="/misReservas" element={<ProtectedRoute rol={["admin", "user", "root"]}><MisReservas /></ProtectedRoute>} />
          <Route path="/rolesPermisos" element={<ProtectedRoute rol={["root"]}><RolesPermisos /></ProtectedRoute>} />
          <Route path="/eliminarProducto" element={<ProtectedRoute rol={["admin", "root"]}><EliminarProducto /></ProtectedRoute>} />
          <Route path="/altaproducto" element={<ProtectedRoute rol={["admin", "root"]}><AdminPanel /></ProtectedRoute>} />
          <Route path="*" element={<NotFound/>}/>
          
        </Routes>
        <Footer />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
