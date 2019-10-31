import React, {Component} from "react";
import {MDBCard, MDBCardBody, MDBCardHeader, MDBIcon, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import axios from 'axios';
import Inovicesdata from "./invoicesdata";

class Invoices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoices: []
        }
        this.tabRow = this.tabRow.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:5000/brp/invoices')
            .then(response => {
                console.log(response)
                // let persons = this.state.invoices.slice();
                // persons.push(response.data)
                this.setState({invoices: response.data});
            })
            .catch((error) => {
                console.log(error);
            })
    }

    tabRow = () => {
        console.log(this.state.invoices)
        let cc = this
        let Ac = this.state.invoices
        console.log(Ac)
        // this.state.invoices.map(invoice=> console.log(invoice))
        // this.state.invoices.forEach(invoice=> console.log(invoice))
        // return this.state.invoices.map(function (object, i) {
        //     console.log(cc.state.invoices)
        //     return <Inovicesdata obj={object} key={Math.random()}/>;
        // });

    }

    render() {
        console.log(this.state.invoices)
        this.state.invoices.forEach(invoice=>console.log(invoice))
        return (

            <div className="container">
                <div className="m-4">
                    <div className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-11">
                            <MDBCard>
                                <MDBCardHeader tag="h3" style={{backgroundColor: "#9ACD32", color: "white"}}
                                               className="text-center font-weight-bold text-uppercase py-4">
                                    Invoices Record
                                </MDBCardHeader>

                                <MDBCardBody>
                                    <MDBTable striped bordered hover responsive>
                                        <MDBTableHead>
                                            <tr>
                                                <th>Invoice_no</th>
                                                <th>C-Name</th>
                                                <th>C-Address</th>
                                                <th>C-Phone no</th>
                                                <th>invoice_date</th>
                                                <th>Services</th>
                                                <th>Items</th>
                                                <th>Quantity</th>
                                                <th>Total Amount</th>
                                                <th>Actions</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {this.tabRow()}
                                            {/*{console.log('okkkkk')}*/}
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

export default Invoices;