import React from 'react';
import { Link } from 'react-router-dom';
import img1 from "../assets/bodas.jpg";
import img2 from "../assets/img34.jpeg";
import img3 from "../assets/cumpleanios.jpg";
import img4 from "../assets/empresarial.jpg";



        const photos = [
          {
            id: 1,
            imageUrl: img1,
            rating: 4,
            comment:"Fusion catering se encargo de cada detalle en mi boda, los recomiendo!",
            Autor:"Carlos F Garrido"
          },
          {
            id: 2,
            imageUrl: img2,
            rating: 3,
            comment:"Los mejores en servicio de catering, los strawberry muy ricos",
            Autor:"Julieta M"
          },
          {
            id: 3,
            imageUrl: img3,
            rating: 3,
            comment:"Mi fiesta de 15 años fue la mejor sin duda!!! ",
            Autor:"Yanina Ortega"
          },
          {
            id: 4,
            imageUrl: img4,
            rating: 3,
            comment:"Detalles de decoracion y organizacion excelentes!",
            Autor:"AGroExport S.A"
          },
         
          
          // Agrega más objetos de fotos según sea necesario
        ];
        
        const Recomendaciones = () => {
          return (
            <div className="photo-slider">
              {photos.map((photo) => (
                <div key={photo.id} className="card">
                  <img className='puntos' src={photo.imageUrl} alt={`Foto ${photo.id}`} />
                  <p className='comentario'>{photo.comment}</p>
                  <p className='autor'>{photo.Autor}</p>
                  <div className="rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span 
                        key={star}
                        className={star <= photo.rating ? "filled" : ""}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        };
        
        export default Recomendaciones;
        