import React, { Component } from "react";
import { Link } from "react-router-dom";
import {MDBBtn, MDBTableBody,MDBTooltip,MDBIcon} from "mdbreact";
import axios from "axios";
class Inovicesdata extends Component {
    constructor(props) {
        super(props);
        this.state={
            message:''
        };

        // console.log("this.props", this.props.obj);
    }


    delete=(e) => {
        let el = e.target;
        let row = el.closest('tr');
        var i = row.rowIndex;
        // console.log(i);
        axios.delete('http://localhost:5000/brp/deleteinvoice/' + this.props.obj.id)
            .then(res => {
                console.log(res);
                console.log('ok');
                 this.setState({ message: res.data.message })
                // console.log(res);
                document.getElementById('invoicesTable').deleteRow(i)
                 // window.location.reload()
            })
            .then(() => console.log(this.state.message))
            .catch(err => console.log(err));
        axios.delete('http://localhost:5000/brp/deleteitemsdata/' + this.props.obj.slagme)
            .then(res => console.log(res))
            .catch(error =>console.log(error))
    };
    render() {
        // console.log(this.props)
        let { obj } = this.props
        return (
            <MDBTableBody>
            <tr>
                <td> {obj.slagme}</td>
                <td>{obj.c_name}</td>
                <td>{obj.c_address}</td>
                <td>{obj.c_number}</td>
                <td>{obj.date}</td>
                <td>{obj.services}</td>
                <td>{obj.total_amount}</td>
                <td>
                    {/*<Link to={"/editinvoice/" + this.props.obj.id}>*/}
                    {/*    <button className="btn btn-primary btn-sm">*/}
                    {/*        <i className="fas fa-edit">*/}
                    {/*        </i>*/}
                    {/*    </button>*/}
                    {/*</Link>*/}
                    <Link to={"/itemsdetail/" + obj.slagme} >
                        <MDBTooltip
                            placement="left"
                        >
                            <MDBBtn size="sm"><MDBIcon icon="eye" /></MDBBtn>
                            <div>
                               View Items Detail
                            </div>
                        </MDBTooltip>
                    </Link>
                    <MDBBtn size="sm" color="danger" onClick={this.delete} >
                        <i className="fas fa-trash">
                        </i>
                    </MDBBtn>
                </td>
            </tr>
            </MDBTableBody>
        )
    }
}
export default Inovicesdata;