import React,{ Component  } from "react";
import { MDBCard, MDBCardBody, MDBCardHeader, MDBIcon, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import logo from "./green-plus-sign-icon-16.jpg";
import Inovicesdata from "./invoicesdata";
class Invoices extends Component{
  constructor(props){
     super(props);
      this.state={
          invoices:[]
      }
}

showitem(){
      this.state.invoices.map((items) =>{
         return(
             <tr>
                 <td>{items.id}</td>
                 <td>{items.c_name}</td>
                 <td>{items.c_address}</td>
                 <td>{items.c_email}</td>
                 <td>{items.c_number}</td>
                 <td>{items.services}</td>
                 <td>{items.items}</td>
             </tr>
         )
      });
}



    componentDidMount() {
        fetch('http://localhost:5000/brp/invoices')
            .then(res =>res.json())
            .then(invoice => {
                  // console.log(invoice);
                    let data = this.state.invoices.slice();
                    data.push(invoice);
                    this.setState({invoices:data});
                    console.log(this.state.invoices);
            }

            );
}

    render() {
        return(

            <div className="container">
                <div className="m-4">
                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-11">
                        <MDBCard>
                            <MDBCardHeader tag="h3" style={{backgroundColor:"#9ACD32",color:"white"}} className="text-center font-weight-bold text-uppercase py-4">
                               Invoices Record
                            </MDBCardHeader>

                            <MDBCardBody>
                                <MDBTable striped bordered hover responsive  >
                                    <MDBTableHead>
                                        <tr>
                                            <th>Invoice_id</th>
                                            <th>C-Name</th>
                                            <th>C-Address</th>
                                            <th>C-Email</th>
                                            <th>C-Phone no</th>
                                            <th>Services</th>
                                            <th>Items</th>
                                            <th>Quantity</th>
                                            <th>Total Amount</th>
                                            <th>Created_date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        <Inovicesdata
                                        onrenderchild={this.state}
                                        />
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