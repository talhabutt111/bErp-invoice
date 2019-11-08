import React, { Component } from "react";
import { MDBBtn } from "mdbreact";
import axios from 'axios';
import { Link } from "react-router-dom";


class Clientdata extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            activePage: 1
        }
    }

    deleteClient = (e) => {
        let el = e.target;
        let row = el.closest('tr');
        var i = row.rowIndex;
        // console.log(i);

        axios.delete('http://localhost:5000/brp/deleteclient/' + this.props.obj.id)
            .then(res => {

                this.setState({ message: res.data.message })
                console.log(res)
                document.getElementById('clientsTable').deleteRow(i)
                // window.location.reload()
            })
            .then(() => console.log(this.state.message))
            .catch(err => console.log(err));
    }

    // alert = () => {
    //     return (
    //         <p><strong>{this.state.message}</strong></p>
    //     )
    // };

    // handlePageChange(pageNumber) {
    //     console.log(`active page is ${pageNumber}`);
    //     this.setState({ activePage: pageNumber });
    // }

    render() {
        let { obj } = this.props
        console.log(obj);

        // console.log(this.props.obj.id);

        return (
            < tr >
                <td> {obj.cl_name}</td>
                <td>{obj.address}</td>
                <td>{obj.email}</td>
                <td>{obj.number}</td>
                <td>{obj.company}</td>
                <td><Link to={"/edit/" + obj.id} >
                    <button className="btn btn-primary btn-sm">
                        <i className="fas fa-edit" />
                    </button>
                </Link>
                    |<MDBBtn size="sm" color="danger" onClick={this.deleteClient}>
                        <i className="fas fa-trash" />
                    </MDBBtn>
                </td>
            </tr >


        )
    }
}
export default Clientdata;