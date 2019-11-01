import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdbreact";
class Inovicesdata extends Component {
    constructor(props) {
        super(props);

        console.log("this.props", this.props.obj);
    }
    render() {
        console.log(this.props)
        let { obj } = this.props
        return (
            <tr>
                <td> {obj.serial}</td>
                <td>{obj.c_name}</td>
                <td>{obj.c_address}</td>
                <td>{obj.number}</td>
                <td>{obj.date}</td>
                <td>{obj.services}</td>
                <td>{obj.items}</td>
                <td>{obj.quantity}</td>
                <td>{obj.total_amount}</td>
                <td>
                    <Link to={"/edit/" + obj.id} >
                        <button className="btn btn-primary btn-sm">
                            <i className="fas fa-edit">
                            </i>
                        </button>
                    </Link>
                    <MDBBtn size="sm" color="danger" onClick={this.delete}>
                        <i className="fas fa-trash">
                        </i>
                    </MDBBtn>
                </td>
            </tr>
        )
    }
}
export default Inovicesdata;