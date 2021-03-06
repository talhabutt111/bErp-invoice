import React, { Component } from 'react';
import axios from 'axios';
import Pagination from "react-js-pagination";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import ClientData from "./ClientData";


class Clients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
        }
    }
    //fetching clients data using axios
    componentDidMount() {
        axios.get('http://localhost:5000/getAllClients')
            .then(response => {
                this.setState({ clients: response.data.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    tabRow = () => {
        console.log(this.state.clients);

        return this.state.clients.map(function (object, i) {
            return <ClientData obj={object} key={i} />;
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
    // handlePageChange = (pageNumber) => {
    //     console.log(`active page is ${pageNumber}`);
    //     this.setState({ activePage: pageNumber });
    // }

    render() {
        //    console.log(this.state);

        return (
            <div className="container">
                <div className="m-4">
                    <div className="row">
                        <div className="col-sm-11 offset-1">
                            <MDBCard>
                                <MDBCardHeader tag="h3" style={{ backgroundColor: "#9ACD32", color: "white" }} className="text-center font-weight-bold text-uppercase py-4">
                                    Clients Record
                                </MDBCardHeader>
                                <MDBCardBody>
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
                                        <MDBTableBody>
                                            {this.tabRow()}
                                        </MDBTableBody>
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


export default Clients;
