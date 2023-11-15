import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";

const Categorias = ({ categoriasList }) => {
  return (
    <div className="cardsCategorias">
      {categoriasList.map((valueCard) => {
        return (
          <Link
            key={valueCard.label}
            to={"/detalleProducto"}
            state={{ nombre: valueCard.label, url: valueCard.img }}
          >
            <Card className="card">
              <CardMedia 
                component="img"
                height="120"
                alt={valueCard.label}
                image={valueCard.img}
                title={valueCard.label}
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {valueCard.label}
                </Typography>
                <Typography variant="body2" color="text.secondary"></Typography>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default Categorias;
