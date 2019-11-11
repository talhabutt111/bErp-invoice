import React, { Component } from "react";
import axios from 'axios';
import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
} from "mdbreact";

class InvoiceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {

        axios.get('http://localhost:5000/getSpecificInvoiceDetails/' + this.props.match.params.slagme)
            .then(res => {
                console.log(res.data)
                this.setState({ items: res.data.data })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        let { items } = this.state

        return (
            <div className="m-5">
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-lg-5 col-md-8 col-sm-12 ">
                        <MDBCard>
                            <MDBCardHeader tag="h3" style={{ backgroundColor: "#9ACD32", color: "white" }}
                                className="text-center font-weight-bold text-uppercase py-4">
                                Items Detail for '{this.props.match.params.slagme}'
                            </MDBCardHeader>

                            <MDBCardBody>
                                <MDBTable responsive striped hover bordered>
                                    <MDBTableHead>
                                        <tr>
                                            <th>Services</th>
                                            <th>Item_detail</th>
                                            <th>Qunatity</th>
                                            <th>price</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>

                                        {
                                            this.state.items.map((item, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{item.services}</td>
                                                        <td>{item.detail}</td>
                                                        <td>{item.qty}</td>
                                                        <td>{item.price}</td>

                                                    </tr>

                                                )
                                            })}
                                    </MDBTableBody>
                                </MDBTable>
                            </MDBCardBody>
                        </MDBCard>


                    </div>
                </div>
            </div>

        )
    }
}

export default InvoiceDetails;
