import React,{ Component  } from 'react';
import logo from './green-plus-sign-icon-16.jpg';
import axios from 'axios';
import Pagination from "react-js-pagination";
import Addclient from "./Addclient";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { MDBCard, MDBCardHeader, MDBCardBody,MDBTable, MDBTableBody, MDBTableHead , MDBBtn,MDBIcon} from "mdbreact";
import Clientdata from "./clientdata";
class Client extends  Component {
   constructor(props){
       super(props);
       this.state={
           clients:[],
           activePage: 15
       }
   }
    //using axiosApi
       componentDidMount(){
           axios.get('http://localhost:5000/brp/clients')
               .then(response => {
                   this.setState({ clients: response.data });
               })
               .catch(function (error) {
                   console.log(error);
               })
       }
    tabRow(){
        return this.state.clients.map(function(object, i){
            return <Clientdata obj={object} key={i} />;
        });
    }

    /*
     //using fetchApi
     componentDidMount() {
         fetch('http://localhost:5000/brp/clients')
             .then(res =>res.json())
             .then(data =>{
                 let clientdata = this.state.clients.slice();
                 clientdata.push(data);
                 this.setState({clients:clientdata});
             }).catch(err =>{
                 console.log(err);
         })
     }
  */
    handlePageChange= (pageNumber)=> {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }
    render() {
    //    console.log(this.state);

        return (
<div className="container">
    <div className="m-4">
        <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-11">
                <MDBCard>
                    <MDBCardHeader tag="h3" style={{backgroundColor:"#9ACD32",color:"white"}} className="text-center font-weight-bold text-uppercase py-4">
                        Clients Record
                    </MDBCardHeader>

            <MDBCardBody>
                <Router>
                   </Router>
                <Switch>


                </Switch>


                        <MDBTable id='clientsTable' striped bordered hover responsive >
                            <MDBTableHead>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Email</th>
                                    <th>Phone no</th>
                                    <th>Company</th>
                                    <th>Actions</th>
                                </tr>
                            </MDBTableHead>
                            {this.tabRow()}

                        </MDBTable>

                    </MDBCardBody>
                </MDBCard>

            </div>
        </div>

    </div>
</div>
        )

    }
}


export default Client;
