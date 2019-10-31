import React,{ Component  } from "react";
import {Link} from "react-router-dom";
import {MDBBtn} from "mdbreact";
class Inovicesdata extends Component{
    constructor(props){
        super(props);

        console.log("this.props",this.props.obj);
    }
    render() {
        console.log(this.props)
        let {obj}=this.props
        return(
            <tr key={obj.quantity+Math.random()}>
                <td> {this.props.obj.serial}</td>
                <td>{this.props.obj.c_name}</td>
                <td>{this.props.obj.c_address}</td>
                <td>{this.props.obj.number}</td>
                <td>{this.props.obj.date}</td>
                <td>{this.props.obj.services}</td>
                <td>{this.props.obj.items}</td>
                <td>{this.props.obj.quantity}</td>
                <td>{this.props.obj.total_amount}</td>
                <td><Link to={"/edit/"+this.props.obj.id} ><button className="btn btn-primary btn-sm"><i className="fas fa-edit"></i></button></Link>|<MDBBtn size="sm" color="danger" onClick={this.delete}><i className="fas fa-trash"></i></MDBBtn></td>
            </tr>
        )
    }
}
export default Inovicesdata;