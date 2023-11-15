import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  WineBar,
  TableRestaurant,
  TipsAndUpdates,
  AutoFixHigh,
} from "@mui/icons-material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {  useNavigate } from "react-router-dom";


import "react-datepicker/dist/react-datepicker.css";
import "./caracteristicasProducto.css";

const BotonReserva = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = React.useState(new Date());
  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button className="btn-donate" onClick={() => navigate("/reserva")}>
      Reservar
    </button>
  ));
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<ExampleCustomInput value="Reserva" />}
    />
  );
};

const CaracteristicaProducto = ({ detalle }) => {



  return (
    <>
      <div className="container-collapsable">
        {detalle.category && <h2>{detalle.category}</h2>}
        <h2>Acerca de {detalle.nombre}</h2>
        {detalle.location && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FontAwesomeIcon icon={faLocationDot} />
            <h2 style={{ marginLeft: "5px" }}>{detalle.location}</h2>
          </div>
        )}

        {detalle.precio && <h2>Precio ${detalle.precio}</h2>}
        <div>
          <h4>
            {detalle.descripcion ? detalle.descripcion : 'Somos una empresa con más de 15 años de experiencia, especializados en bodas personalizadas y en la innovación, creación y realización de ventos sociales y empresariales. Le ofrecemos: Atención rápida y personalizada Somos certificados como Wedding & Event Planner en Europa.'}
          </h4>
          {detalle.category }

        </div>
      </div>
      <div style={{ width: "100%" }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>¿Qué ofrece?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="icons-collapsable">
              <div>
                <Typography>Cristalería</Typography>
                <WineBar />
              </div>
              <div>
                <Typography>Mesas</Typography>
                <TableRestaurant />
              </div>
              <div>
                <Typography>Luces</Typography>
                <TipsAndUpdates />
              </div>
              <div>
                <Typography>Decoración</Typography>
                <AutoFixHigh />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};
export default CaracteristicaProducto;
