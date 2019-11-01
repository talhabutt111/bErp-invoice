import React, { Component } from "react";
import axios from "axios";
import { MDBCard, MDBCardBody, MDBCardHeader, MDBInput } from "mdbreact";
class EditClient extends Component {
    constructor(props) {
        super(props);
        this.onChangePersonName = this.onChangePersonName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeNumber = this.onChangeNumber.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: '',
            email: '',
            address: '',
            number: '',
            company: ''
        }
    }
    onChangePersonName(e) {

        this.setState({
            name: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        })
    }
    onChangeNumber(e) {
        this.setState({
            number: e.target.value
        })
    }
    onChangeCompany(e) {
        this.setState({
            company: e.target.value
        })
    }
    componentDidMount() {

        axios.get('http://localhost:5000/brp/clients/' + this.props.match.params.id)
            .then(response => {
                let client = response.data.shift()
                this.setState({
                    name: client.cl_name,
                    address: client.address,
                    email: client.email,
                    number: client.number,
                    company: client.company
                });
            })
            // .then(() => { console.log(this.state.name, this.state.address) })
            .catch(function (error) {
                console.log(error);
            })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            company: this.state.company
        };
        axios.put('http://localhost:5000/brp/updateclient/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/client');
    }


    render() {
        // console.log(this.state);


        return (
            <div className="container">
                <div className="m-4">
                    <div className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-11">
                            <MDBCard>
                                <MDBCardHeader tag="h3" style={{ backgroundColor: "#9ACD32", color: "white" }} className="text-center font-weight-bold text-uppercase py-4">
                                    Edit Client
                                </MDBCardHeader>

                                <MDBCardBody>
                                    <form onSubmit={this.onSubmit}>
                                        <div className="container-fluid" style={{ borderStyle: "groove", borderRadius: "10px" }}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <MDBInput icon="user" type="text" label="Client-name"
                                                        value={this.state.name}
                                                        onChange={this.onChangePersonName}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <MDBInput icon="address-card" type="text" label="Address"
                                                        value={this.state.address}
                                                        onChange={this.onChangeAddress}
                                                    /><br />
                                                </div>
                                                <div className="col-md-4">
                                                    <MDBInput icon="at" type="text" label="Email"
                                                        value={this.state.email}
                                                        onChange={this.onChangeEmail}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <MDBInput icon="building" type="text" label="Company-name"
                                                        value={this.state.company}
                                                        onChange={this.onChangeCompany}
                                                    /><br />
                                                </div>
                                                <div className="col-md-4">
                                                    <MDBInput icon="mobile" type="text" label="Contact-no"
                                                        value={this.state.number}
                                                        onChange={this.onChangeNumber}
                                                    /><br />
                                                </div>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-9"></div>
                                            <div className="form-group">
                                                <input type="submit" value="Register Client" className="btn btn-primary" />
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
export default EditClient;