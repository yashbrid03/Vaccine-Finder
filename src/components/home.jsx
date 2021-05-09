import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {Link} from "react-router-dom";
import styles from "./home.module.css";
import img from "../images/myimg.jpg";

const Home = () => {
  

  return (
    <div >
    <div className={styles.container}>
      <div className={styles.circle1}></div>
      <div className={styles.circle2}></div>
    <h1 className={styles.h1} >In search of Vaccine ?</h1>
    <h2 className={styles.h2}>Don't worry we got you!</h2>
    <div className="d-flex justify-content-center "><Link to="./find" className={styles.btn}>FIND</Link></div>
    </div>
    <div id="aboutus" className={`${styles.container2} " container"`} >
      <div className={styles.flex} style={{justifyContent:"space-between"}}>
      <div className={styles.container3}>
      <h1>About Me</h1>
      <p>Hello Fellas! My name is Yash Nilesh Brid. I am 18 years old and currently studying at V.E.S.Polytechnic. I have developed this Vaccine Finder Website by using cowin api which is recently made public by government.
        You can use this website to check the availability of the Vaccine near your area. In future I am planning to add feature to get certificate, currently it is disabled.        
      </p>
      <span>You can follow me on Social media :</span><br/>
      <a href="https://github.com/yashbrid03"><i className={`${styles.social} fab fa-github`}></i></a><a href="https://www.instagram.com/yashbrid04/"><i className={`${styles.social} fab fa-instagram`}></i></a>
      </div>
      <img src={img} className={`${styles.myimage} img-fluid`} ></img>
      </div>
    </div>
    
    </div>
  );
}

export default Home;