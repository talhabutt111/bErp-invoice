import React, { Component } from "react";
import { MDBBtn, MDBTableBody } from "mdbreact";
import axios from 'axios';
import { Link } from "react-router-dom";
class Clientdata extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            activePage: 1
        }
        this.delete = this.delete.bind(this);

        // console.log("clients", this.props);
    }
    delete(e) {
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
    alert=() =>{
        return(
            <p><strong>{this.state.message}</strong></p>
        )
    };
    handlePageChange (pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }
    render() {
        // console.log(this.props.obj.id);
        
        return (

            <MDBTableBody>

                <tr>
                    <td> {this.props.obj.cl_name}</td>
                    <td>{this.props.obj.address}</td>
                    <td>{this.props.obj.email}</td>
                    <td>{this.props.obj.number}</td>
                    <td>{this.props.obj.company}</td>
                    <td><Link to={"/edit/" + this.props.obj.id} >
                        <button className="btn btn-primary btn-sm">
                            <i className="fas fa-edit">
                            </i>
                        </button>
                    </Link>
                        |<MDBBtn size="sm" color="danger" onClick={this.delete}>
                            <i className="fas fa-trash">
                            </i>
                        </MDBBtn>
                    </td>
                </tr>

            </MDBTableBody>

        )
    }
}
export default Clientdata;