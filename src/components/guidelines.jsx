import React, { Component } from 'react';
import img from "../images/guideline.jpg";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./guidelines.module.css"
class Guidelines extends Component {
    state = {  }
    render() { 
        return ( 
        <div className={styles.flex}>
            <img className={`${styles.img} img-fluid`} style={{borderRadius:'200px 200px 10px 10px'}} src={img} width="383" height="574"></img> 
            <div className={styles.container}>
                <h1 className="text-center">Guidlines to Follow :</h1>
                <ul>
                    <li className="text-justify">Regularly and thoroughly clean your hands with an alcoholbased hand rub or wash them with soap and water.</li>
                    <li className="text-justify">Maintain at least 1 metre (3 feet) distance between yourself and
anyone who is coughing or sneezing.
</li>
                    <li className="text-justify">Avoid touching eyes, nose and mouth.
Why? Hands touch many surfaces and can pick up viruses.
Once contaminated, hands can transfer the virus to your eyes,
nose or mouth. From there, the virus can enter your body and
can make you sick.</li>
                    <li className="text-justify">Make sure you, and the people around you, follow good
respiratory hygiene. This means covering your mouth and nose
with your bent elbow or tissue when you cough or sneeze. Then 
dispose of the used tissue immediately.</li>
                    <li className="text-justify">Stay home if you feel unwell. If you have a fever, cough and
difficulty breathing, seek medical attention and call in advance.
Follow the directions of your local health authority.</li >
                    
                </ul>
            </div>
        </div>);
    }
}
 
export default Guidelines;