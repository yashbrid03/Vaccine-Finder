import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import styles from "./find.module.css"

class Find extends Component {
  constructor(props) {
    super(props);
      this.state = { 
        error: null,
        isLoaded: true,
        states :[],
        selected_state_id:1,
        district: [],
        selected_district_id:1,
        selected_date: null,
        sessions: [],
        searched:0
      }
    }

  componentDidMount(){
    fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states")
      .then(res => res.json())
      .then((result) => {
          this.setState({
                isLoaded: true,
                states: result.states
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
      )
          
    fetch("https://cdn-api.co-vin.in/api/v2/admin/location/districts/"+this.state.selected_state_id)
      .then(res => res.json())
      .then((result) => {
          this.setState({
                district: result.districts,
                selected_district_id: result.districts[0].district_id
            });
            console.log(this.state.selected_district_id)
          },
          (error) => {
              this.setState({
               error
            });
          }
        )      
  }

  stateChangeHandler = event =>{     
    this.setState({
      selected_state_id:event.target.value
      })
        fetch("https://cdn-api.co-vin.in/api/v2/admin/location/districts/"+event.target.value)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                  district: result.districts,
                  selected_district_id: result.districts[0].district_id
                });
              },
              (error) => {
                this.setState({
                  error
                });
              }
        )
    }

    districtChangeHandler = event =>{
      this.setState({
        selected_district_id:event.target.value
      })
    }

    dateChangeHandler = event =>{
      var date = event.target.value
      var year = date.slice(0,4);
      var month = date.slice(5,7);
      var day = date.slice(8,10);
      date = day+"-"+month+"-"+year;
      this.setState({
        selected_date:date
      })
      console.log(date)
    }

    fetchData = ()=>{
        fetch("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id="+this.state.selected_district_id+"&date="+this.state.selected_date)
        .then(res => res.json())
        .then((result) => {
                this.setState({
                    sessions : result.sessions,
                    searched : 1
                  });
              },
              (error) => {
                this.setState({
                  error
                });
              }
        )

    }

    shows = ()=>{
        console.log(this.state.sessions[0])
    }

    render() { 
        
            const { error, isLoaded, states, sessions, district, searched, selected_date} = this.state;
            if (error) {
                return <div>Error: {error.message}</div>;
            } else if (!isLoaded) {
                return <div>Loading...</div>;
            } else {
              let str,btn;
              if(selected_date){
                btn = <button className="form-control"  onClick={this.fetchData}> Search</button>
              }
              else{
                btn = <button className="form-control" disabled onClick={this.fetchData}> Search</button>
              }
              if (searched === 0){
                str = <h1 style={{textAlign:"center",marginTop:"4vh"}}>Please click on search for result</h1>
              }
              else{
                str = <h1 style={{textAlign:"center",marginTop:"4vh"}}>No Doses available</h1>
              }
                return ( 
                    <div className="container">
                        <div className="row g-3">
                            <div className="col-sm-4">
                                <label className="form-label">State</label>
                                <select className="form-control " onChange={this.stateChangeHandler}>
                                {states.map(states =>(
                                    <option key={states.state_id} value={states.state_id} >{states.state_name}</option>
                                ))}
                                </select>
                            </div>
                            <div className="col-sm-3">
                                <label className="form-label ">District</label>
                                <select className="form-control" onChange={this.districtChangeHandler}>
                                    {district.map(district =>(
                                        <option key={district.district_id} value={district.district_id}>{district.district_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-sm-3">
                                <label className="form-label" >Date</label>
                                <input type="date" className="form-control" onChange={this.dateChangeHandler}></input>
                            </div>
                            <div className="col-sm-2">
                                <label className="form-label"> &nbsp;</label>
                                {btn}
                            </div>  
                        </div>
                                      {sessions.length > 0 && searched === 1 ? sessions.map(ses=>
                                        <div className={styles.container}>
                                        <div className="row">
                                          <div className={`${styles.block1} col-6 col-sm-4 `}><b>Name: </b>{ses.name} </div>
                                          <div className={`${styles.block2} col-6 col-sm-4 `}><b>pincode:</b> {ses.pincode}</div>
                                          <div className="w-100 d-none"></div>
                                          <div className={`${styles.block3} col-6 col-sm-4 `}><b>Cost:</b> {ses.fee_type}</div>
                                          <div className={`${styles.block4} col-6 col-sm-4 `}><b>Dose:</b> <high>{ses.available_capacity}</high></div>
                                          <div className={`${styles.block5} col-6 col-sm-4 `}><b>Age Limit:</b> {ses.min_age_limit}+</div>
                                          <div className={`${styles.block6} col-6 col-sm-4 `}><b>Vaccine:</b> {ses.vaccine}</div>
                                          <div className={styles.block7}><b>slots:</b> {ses.slots.map(res=><span>{res}, </span>)}"09:00AM-11:00AM","11:00AM-01:00PM","01:00PM-03:00PM","03:00PM-05:00PM"</div>
                                        </div>
                                      </div>
                                      ):str}  
                    </div>
                     );
                }
    }
}
 
export default Find;