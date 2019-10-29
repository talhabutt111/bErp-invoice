import React,{ Component } from "react";
import {MDBBtn} from "mdbreact";
import axios from 'axios';
import { Link } from "react-router-dom";
class Clientdata extends Component{
    constructor(props){
        super(props);
        this.delete=this.delete.bind(this);

       console.log("clients",this.props);
    }
    delete() {
        axios.delete('http://localhost:5000/brp/deleteclient/'+this.props.obj.id)
            .then(console.log('Deleted successfully'))
            .catch(err => console.log(err))
    }
render() {
    return(
        <tr>
            <td> {this.props.obj.cl_name}</td>
            <td>{this.props.obj.address}</td>
            <td>{this.props.obj.email}</td>
            <td>{this.props.obj.number}</td>
            <td>{this.props.obj.company}</td>
            <td><Link to={"/edit/"+this.props.obj.id} ><button className="btn btn-primary btn-sm"><i className="fas fa-edit"></i></button></Link>|<MDBBtn size="sm" color="danger" onClick={this.delete}><i className="fas fa-trash"></i></MDBBtn></td>
        </tr>
    )
}
}
export default Clientdata;