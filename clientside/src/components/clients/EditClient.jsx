import React, { Component } from "react";
import axios from "axios";
import { MDBCard, MDBCardBody, MDBCardHeader, MDBInput } from "mdbreact";
class EditClient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            address: '',
            number: '',
            company: ''
        }
    }

    onChange = name => (e) => {
        this.setState({
            [name]: e.target.value
        });
    }

    componentDidMount() {
        axios.get('http://localhost:5000/getSpecificClient/' + this.props.match.params.id)
            .then(response => {
                let client = response.data.shift()
                console.log(client);

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

    onSubmit = (e) => {
        e.preventDefault();
        let form = this.editClientForm;
        if (form.checkValidity() === false) {
            form.classList.add('was-validated');
        }
        else {
            let { name, email, address, number, company } = this.state
            const obj = {
                name: name,
                email: email,
                address: address,
                number: number,
                company: company,
            };
            axios.put('http://localhost:5000/updateClient/' + this.props.match.params.id, obj)
                .then(res => console.log(res.data));

            this.props.history.push('/client');
            window.location.reload()
        }
    }



    render() {
        // console.log(this.state);
        let { name, email, address, number, company } = this.state


        return (
            <div className="container">
                <div className="m-4">
                    <div className="row">
                        <div className="col-sm-11 offset-1">
                            <MDBCard>
                                <MDBCardHeader tag="h3" style={{ backgroundColor: "#9ACD32", color: "white" }} className="text-center font-weight-bold text-uppercase py-4">
                                    Edit Client
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <form onSubmit={this.onSubmit} ref={ref => this.editClientForm = ref} noValidate className="needs-validation grey-text">
                                        <div className="container-fluid" style={{ borderStyle: "groove", borderRadius: "10px" }}>
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
                                                        <div className="invalid-feedback">Please provide a Valid Address</div>
                                                    </MDBInput>
                                                </div>
                                                <div className="col-md-4">
                                                    <MDBInput icon="at" type="email" label="Email"
                                                        value={email}
                                                        onChange={this.onChange('email')}
                                                        required
                                                    >
                                                        <div className="valid-feedback">Looks good!</div>
                                                        <div className="invalid-feedback">Please provide a Valid Email with @</div>
                                                    </MDBInput>
                                                </div>
                                                <div className="col-md-4">
                                                    <MDBInput icon="building" type="text" label="Company-name"
                                                        value={company}
                                                        onChange={this.onChange('company')}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <MDBInput icon="mobile" type="number" label="Contact-no"
                                                        value={number}
                                                        onChange={this.onChange('number')}
                                                        required
                                                    >
                                                        <div className="valid-feedback">Looks good!</div>
                                                        <div className="invalid-feedback">Please provide a Valid number</div>
                                                    </MDBInput>
                                                </div>
                                            </div>
                                            <div className="row justify-content-end pr-2">
                                                <div className=" form-group">
                                                    <input type="submit" value="Update Client" className="btn btn-primary" />
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
export default EditClient;