import React, { Component,useState } from 'react';
import Logo from '../images/Logo1.png';
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./nav.module.css"

const Navbar = props => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    
    
        return(
            <nav className="navbar navbar-light navbar-expand-lg" style={{backgroundColor:"#E08963"}} >
      <Link className="navbar-brand  font-weight-bolder" to="./">
        <img src={Logo} alt="Logo" width="135" height="42" className="vertical-align-middle" />
        
      </Link>
      <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`${isNavCollapsed ? 'collapse justify-content-end' : ''} navbar-collapse`} id="navbarsExample09">
        <Link className={`${styles.navlink} nav-link`} to="./find" style={{color:"black"}}>Search Vaccine</Link>
        <a className={`${styles.navlink} nav-link `} href="#" style={{color:"#3f4242"}}>Certificate</a>
        <Link className={`${styles.navlink} nav-link`} to="./guidelines" style={{color:"black"}}>Guidelines</Link>
        <a className={`${styles.navlink} nav-link`} href="./#aboutus" style={{color:"black"}}>About Me</a>
      </div>
    </nav>
        )
    }

 
export default Navbar;