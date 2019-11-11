import React, { Component } from "react";
// import {MDBNotification} from "mdbreact";

import {
    MDBInput,
    // MDBBtn,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
} from 'mdbreact';
import axios from 'axios';


class AddClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            address: '',
            number: '',
            company: '',
            message: ''
        }
    }



    onChange = name => e => {
        this.setState({
            [name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let form = this.addClientForm;
        if (form.checkValidity() === false) {
            form.classList.add('was-validated')
        } else {
            let { name, email, address, number, company } = this.state
            const obj = {
                name: name,
                email: email,
                address: address,
                number: number,
                company: company

            };
            axios.post('http://localhost:5000/AddNewClient', obj)
                .then(res => {
                    this.setState({ message: res.data.message });
                    console.log(this.state.message);
                }
                );

            this.setState({
                name: '',
                email: '',
                address: '',
                number: '',
                company: '',
            })
        }

    }

    alertmessage = () => {
        if (this.state.message !== null) {
            return (
                <div>
                    <strong>{this.state.message}</strong>
                </div>
            )
        }
        else {
            return (
                console.log('null')
            )
        }
    };


    render() {
        let { name, email, address, number, company } = this.state

        return (

            <div className="container">
                <div className="m-4">
                    <div className="row">
                        {/* <div className="col-sm-1">fff</div> */}
                        <div className="col-sm-11 offset-1">
                            <MDBCard>
                                <MDBCardHeader tag="h3" style={{ backgroundColor: "#9ACD32", color: "white" }}
                                    className="text-center font-weight-bold text-uppercase py-4">
                                    Add New Client
                                </MDBCardHeader>
                                <MDBCardBody>
                                    {this.alertmessage()}
                                    <form onSubmit={this.onSubmit} ref={ref => this.addClientForm = ref} noValidate className="needs-validation grey-text">
                                        <div className="container-fluid"
                                            style={{ borderStyle: "groove", borderRadius: "10px" }}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <MDBInput icon="user" type="text" label="Client-name"
                                                        value={name}
                                                        onChange={this.onChange('name')}
                                                        required
                                                    >
                                                        <div className="valid-feedback">Looks good!</div>
                                                        <div className="invalid-feedback">Please provide a Name</div>
                                                    </MDBInput>
                                                </div>
                                                <div className="col-md-6">
                                                    <MDBInput icon="address-card" type="text" label="Address"
                                                        value={address}
                                                        onChange={this.onChange('address')}
                                                        required
                                                    >
                                                        <div className="valid-feedback">Looks good!</div>
                                                        <div className="invalid-feedback">Please provide a Address</div>
                                                    </MDBInput>
                                                </div>
                                                <div className="col-md-4">
                                                    <MDBInput icon="at" type="email" label="Email"
                                                        value={email}
                                                        onChange={this.onChange('email')}
                                                    >
                                                        <div className="valid-feedback">Looks good!</div>
                                                        <div className="invalid-feedback">Please provide a valid Email with @</div>
                                                    </MDBInput>
                                                </div>
                                                <div className="col-md-4">
                                                    <MDBInput icon="building" type="text" label="Company-name"
                                                        value={company}
                                                        onChange={this.onChange('company')}
                                                    >
                                                        <div className="valid-feedback">Clients company name if he have. (optional)</div>
                                                    </MDBInput>
                                                </div>
                                                <div className="col-md-4">
                                                    <MDBInput icon="mobile" type="number" label="Contact-no"
                                                        value={number}
                                                        onChange={this.onChange('number')}
                                                        min="1" step="1"
                                                        required
                                                    >
                                                        <div className="valid-feedback">Looks good!</div>
                                                        <div className="invalid-feedback">Please provide a Number</div>
                                                    </MDBInput>
                                                </div>
                                            </div>
                                            <div className="row justify-content-end pr-2">
                                                <div className=" form-group">
                                                    <input type="submit" value="Register Client" className="btn btn-primary" />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </MDBCardBody>
                            </MDBCard>

                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default AddClient;