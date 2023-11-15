import React from 'react'

import facebookIcon from "../assets/facebook.png"
import googleIcon from "../assets/google.png"
import twitterIcon from "../assets/twitter.png"
import linkedinIcon from "../assets/linkedin.png"

const Footer = () => {
    return(
        
        <footer className="footer">
        
        <ul className="social-icon">
          <li className="social-icon__item"><a className="social-icon__link" href="#">
            <img className='logo' src={facebookIcon} alt="" />
            </a></li>
          <li className="social-icon__item"><a className="social-icon__link" href="#">
            <img className='logo' src={twitterIcon} alt="" />
            </a></li>
          <li className="social-icon__item"><a className="social-icon__link" href="#">
            <img className='logo' src={linkedinIcon} alt="" />
            </a></li>
          <li className="social-icon__item"><a className="social-icon__link" href="#">
            <img className='logo' src={googleIcon} alt="" />
            </a></li>
        </ul>
        <ul className="menu">
          <li className="menu__item"><a className="menu__link" href="#">INICIO</a></li>
          <li className="menu__item"><a className="menu__link" href="#">ACERCA DE</a></li>
          <li className="menu__item"><a className="menu__link" href="#">SERVICES</a></li>
          <li className="menu__item"><a className="menu__link" href="#">EQUIPO</a></li>
          <li className="menu__item"><a className="menu__link" href="#">CONTACTO</a></li>
    
        </ul>
        <p>&copy;2023 Digital House Equipo 11 | Todos los derechos reservados</p>
      </footer>
    )
}
export default Footer;