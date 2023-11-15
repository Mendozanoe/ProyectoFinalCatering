import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import './producto-aleatorio.css';
import { Link } from 'react-router-dom';

const ProductoAleatorio = () => {
  const productList = [
    
    {
      id: 1,
      category: 'Cumpleaños',
      location: 'Finca la Esmeralda, Quindio, Colombia',
      nombre: "Eventos Familiares,'Cumpleaños Hawaiano'",
      descripcion:
        'Celebra y comparte momentos inolvidables en tu cumpleaños con tematica hawaiana donde contaras con un espacio amplio,comodo y colorido decorado a tu gusto.',
      precio: '500',
      url: 'https://www.daledetalles.com/wp-content/uploads/2016/02/hawai20.jpg',
    },
    {
      id: 2,
      category: 'Empresarial',
      location: 'Tu Empresa',
      nombre: 'Coctel Aniversario Empresarial',
      descripcion:
        'Disfruta de un delicioso coctel junto a tus compañeros de trabajo donde podras vivir momentos llenos de alegria y felicidad por el aniversario de la empresa en que laboras.',
      precio: '450',
      url: 'https://eventsandguides.com/imc/muje.jpg',
    },
    {
      id: 3,
      category: 'Bodas',
      location: 'Hotel Baru Cartagena, Colombia',
      nombre: 'Bodas, Boda en la playa',
      descripcion:
        'Tu boda sera unica e inolvidable con el encanto magico de la playa, sol y aire.',
      precio: '800',
      url: 'https://cdn0.matrimonio.com.co/usr/6/2/5/9/cfb_2x_315300.jpg',
    },
    {
      id: 4,
      category: 'Cocteles',
      location: 'Restaurante Tegui Buenos Aires, Argentina',
      nombre: 'Coctel Aniversario Matrimonio',
      descripcion:
        'Conmevora tu aniversario de bodas para que la felicidad y el amor permanezca como el primer día de bodas.',
      precio: '650',
      url: 'https://orgabodas.com/wp-content/uploads/2018/09/la-fiesta-celebracion.jpg',
    },
    {
      id: 5,
      category: 'Bodas',
      location: 'Resort Sierra Lago Jalico, Mexico',
      nombre: 'Boda Vindage al aire libre',
      descripcion:
        'Tu boda sera autentica e inolvidable con la evocacion de tendencias del pasado e historia conseguiras un ambiente romantico y de mucha personalidad.',
      precio: '900',
      url: 'https://asset1.zankyou.com/images/mag-post/38e/0173/685//-/co/wp-content/uploads/2018/07/alen-karupovic.jpg',
    },
    {
      id: 6,
      category: 'Cocteles',
      location: 'Hotel Plaza Paitilla In, Panamá',
      nombre: 'Coctel de Graduación',
      descripcion:
        'Tu fiesta de graduación será una celebración  maravillosa donde te sentiras orgulloso de tu esfuerzo y dedicación para obtener tu anhelado Titulo.',
      precio: '500',
      url: 'https://media.istockphoto.com/id/1133752267/es/foto/vasos-en-una-mesa.jpg?s=612x612&w=0&k=20&c=AF99AgojpSDCPRTUo2Yhzymr6jm4_ByXdKs6il8PvZ0=',
    },
    {
      id: 7,
      category: 'Cumpleaños',
      location: 'Salon Social Jano´s Benavidez, Buenos Aires, Argentina',
      nombre: 'Cumpleaños Superhéroes',
      descripcion:
        'Tu fiesta de superhéroes será una celebración maravillosa donde te sentiras orgulloso de ver a tu hijo feliz.',
      precio: '450',
      url: 'https://i.pinimg.com/564x/02/d8/7b/02d87b06d645ae79daec1388d9915eef.jpg',
    },
    {
      id: 8,
      category: 'Empresarial',
      location: 'Banco General de Panama, Panamá',
      nombre: 'Celebración Fin de Año',
      descripcion:
        'Despide el año con una celebración alegre y sofisticada donde brindaras con tus compañeros de trabajo por tus logros alcanzados durante el año.',
      precio: '800',
      url: 'https://greencity.com.pa/wp-content/uploads/2018/12/shutterstock_768475918.jpg',
    },
    {
      id: 9,
      category: 'Cocteles',
      location: 'Top by Belo,Rivera Maya, Mexico',
      nombre: 'Coctel Despedida de Soltera',
      descripcion:
        'Despidete de la solteria con los placeres del Caribe Mexicano un excelente lugar distfrutar de cocteles con el mejor atardecer de Isla Mujeres.',
      precio: '600',
      url: 'https://sh-assets.holidu.com/imagecache/blog-photos/16856_Crop_760_444.jpg',
    },
    {
      id: 10,
      category: 'Cumpleaños',
      location: 'Finca las Palmeras, Lima, Perú',
      nombre: 'Cumpleaños Sirenas',
      descripcion:
        'Festeja el cumpleaños de tu hija como en un cuento de Sirenas donde ella sera la protagonista de su fiesta.',
      precio: '450',
      url: 'https://i.pinimg.com/564x/62/20/e4/6220e4a69097ffa5fa0a8e9410173771.jpg',
    },
    {
      id: 11,
      category: 'Empresarial',
      location: 'Iberostar Selection, Miraflores, Perú',
      nombre: 'Evento Presentación Nueva Marca y Productos',
      descripcion:
        'Lanzanzamiento de tu nueva marca de productos y consigue el mejor posicionamiento en tu mercado de negocios.',
      precio: '700',
      url: 'https://i.pinimg.com/564x/cc/f6/6c/ccf66cae0436def8c4f274f89d403902.jpg',
    },
    {
      id: 12,
      category: 'Bodas',
      location: 'Hotel Boutique Casa Gangotena, Quito, Ecuador',
      nombre: 'Boda Noche Estrellada',
      descripcion:
        'Te ofrecemos gran variedad de cocteles, luces, mobiliario, pasabocas y comida a tu elección',
      precio: '950',
      url: 'https://i.pinimg.com/564x/f4/8c/e9/f48ce9f9f35b7a438df17d3e5042275c.jpg',
    },
  ];

  const randomArray = (array) => {
    let currentIndex = array.length,
      randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array.slice(0, 10);
  };

  const productListRandom = randomArray(productList);

  return (
    <>
      <div className='producto-container'>
        {productListRandom.map((producto) => (
          <div className='producto-card' key={producto.id}>
            <div className='card-img-container'>
              <Link to={'/detalleProducto'} state={producto}>
                <img className='card-img' src={producto.url} alt='imagen'></img>
              </Link>
            </div>
            <div className='producto-card-body'>
              <h3>{producto.category}</h3>
              <h4>{producto.nombre}</h4>
              <div className='card-location'>
                <FontAwesomeIcon icon={faLocationDot} />
                <h4>{producto.location}</h4>
              </div>
              <p>{producto.descripcion}</p>
              <div className='rating'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= producto.puntuacion ? 'filled' : ''}
                  >
                    ★
                  </span>
                ))}
              </div>
              {/* ver detalle link */}
              <Link
                className='ver-detalle'
                to={`/detalleProducto`}
                state={producto}
              >
                Ver Detalle
              </Link>
            </div>
            {/* <li>
                <Link to={'/detalleProducto'} state={producto}>
                  <img
                    className='img-cat'
                    src={producto.url}
                    alt='imagen'
                  ></img>
                </Link>
                <p>
                  {producto.nombre} - ${producto.precio}
                </p>
              </li> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductoAleatorio;
