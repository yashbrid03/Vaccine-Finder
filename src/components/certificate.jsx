import React, { Component } from 'react';
import { sha256 } from 'js-sha256';

class Certificate extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            error : null,
            mobileno:'',
            txnId: '',
            otp: '',
            encryptedotp:'',
            token: '',
            href:'',
         }
    }

    update = (event) => {
        this.setState({
            mobileno: event.target.value,
        })
    }
    sendOTP = () => {
        fetch("https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({ mobile: this.state.mobileno })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        txnId: result.txnId,                        
                    });                
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }

    otpupdate = (event) => {
        this.setState({
            otp: event.target.value,
        })
    }

    confirmOTP = () => {
        this.setState({
            encryptedotp: sha256(this.state.otp)
        })
        console.log("encrypted otp")
        
    }

    fetchtoken = ()=>{
        fetch("https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
        body: JSON.stringify({ "otp": this.state.encryptedotp, "txnId": this.state.txnId })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        token: result.token,                        
                    });                    
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }

    getPDF = () =>{
        // fetch("https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id=21392234953052",{
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/pdf',
        //         'accept':'application/pdf',
        //         'Authorization': 'Bearer '+this.state.token,
        //     },
        // })
//         .then(res => {
//             console.log(res);
//             var binaryData = [];
// binaryData.push(res);
        // create `objectURL` of `this.response` : `.pdf` as `Blob`
        // const blob = new Blob(binaryData,{type:'application/pdf'});
        // var file = window.URL.createObjectURL(blob);
        // this.state.href = file;
        // console.log("pdf converted")
        // console.log(file)
        //     const arraybuffer=this.base64ToArrayBuffer(res)
        //     const blob = new Blob([arraybuffer],{type:'application/pdf'});
        //     const url = window.URL.createObjectURL(blob);
        //     this.state.href = url;
        // })
        //21392908753008 dad 
        //21392234953052 mom
//         console.log("inside get pdf")
//         var request = new XMLHttpRequest();
// request.open("GET", "https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id=21392234953052", true); 
// request.responseType = "blob";
// request.setRequestHeader("token",this.state.token)
// request.onload = function (e) {
//     if (this.status === 200) {
//         // `blob` response
        

//     };
// };
// request.send();

var myHeaders = new Headers();
myHeaders.append("accept", "application/pdf");
myHeaders.append("Authorization", "Bearer "+this.state.token);
myHeaders.append("Content-Type", "application/pdf");



var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id=21392234953052", requestOptions)
  .then(response => {response.text();
    var binaryData = [];
binaryData.push(response);
        //create `objectURL` of `this.response` : `.pdf` as `Blob`
        const blob = new Blob(binaryData,{type:'application/pdf'});
        var file = window.URL.createObjectURL(blob);
        this.setState({
            href: file,
        })
        console.log("pdf converted")
console.log(response.body)})
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

    }



    render() { 
        return (<div>

            <input value={this.state.mobileno} type="text" onChange={this.update}></input>
            <button onClick={this.sendOTP}>Procceed</button><br /> <br />
            <p>mobile no:</p>
            {this.state.mobileno ? <b>{this.state.mobileno}</b> : ''}<br /> <br />
            <input value={this.state.otp} type="text" onChange={this.otpupdate}></input>
            <button onClick={this.confirmOTP}>Confirm</button><br /> <br />
            <button onClick={this.fetchtoken}>get token</button><br /> <br />
            <button onClick={this.getPDF}>PDF</button><br /> <br />
            <p>txnId:</p>
            {this.state.txnId ? <b>{this.state.txnId}</b> : ''}<br /> <br />
            <p>token:</p>
            {this.state.token ? <b>{this.state.token}</b> : ''}<br /> <br /><br /> <br />
           
             <a href={this.state.href} download="pdf1.pdf">download</a>
        </div >);
    }
}
 
export default Certificate;