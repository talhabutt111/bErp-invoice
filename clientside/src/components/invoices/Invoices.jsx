import React, { Component } from "react";
import { MDBCard, MDBCardBody, MDBCardHeader, MDBTable, MDBTableHead } from "mdbreact";
import axios from 'axios';
import InvoiceData from "./InvoiceData";

class Invoices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoices: []
        }
    }

    componentDidMount() {

        axios.get('http://localhost:5000/getAllInvoices')
            .then(res => {
                // console.log(res.data)
                this.setState({ invoices: res.data.data }, () => {
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    tableRows = () => {
        return this.state.invoices.map(function (object, i) {
            return <InvoiceData obj={object} key={Math.random()} />;
        });
    }

    render() {
        // console.log(this.state.invoices)
        // this.state.invoices.forEach(invoice=>console.log(invoice))
        return (

            <div className="container">
                <div className="m-4">
                    <div className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-11">
                            <MDBCard>
                                <MDBCardHeader tag="h3" style={{ backgroundColor: "#9ACD32", color: "white" }}
                                    className="text-center font-weight-bold text-uppercase py-4">
                                    Invoices Record
                                </MDBCardHeader>

                                <MDBCardBody>
                                    <MDBTable id='invoicesTable' striped bordered hover responsive>
                                        <MDBTableHead>
                                            <tr>
                                                <th>Invoice_no</th>
                                                <th>C-Id</th>
                                                <th>C-Address</th>
                                                <th>C-Phone no</th>
                                                <th>Date</th>
                                                <th>Total Amount</th>
                                                <th>Actions</th>
                                            </tr>
                                        </MDBTableHead>

                                        {this.tableRows()}

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

export default Invoices;