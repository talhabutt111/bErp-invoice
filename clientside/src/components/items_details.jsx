import React, {Component} from "react";
import axios from 'axios';
import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
} from "mdbreact";

class ItemsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: []
        }
    }

    componentDidMount() {

        axios.get('http://localhost:5000/brp/oneitemdata/' + this.props.match.params.slagme)
            .then(res => {
                this.setState({item: res.data})
                //   console.log(this.state.item)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        let {item} = this.state
        return (
            <div className="m-5">
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-lg-5 col-md-8 col-sm-12 ">
                        <MDBCard>
                            <MDBCardHeader tag="h3" style={{backgroundColor: "#9ACD32", color: "white"}}
                                           className="text-center font-weight-bold text-uppercase py-4">
                                Items Detail for '{this.props.match.params.slagme}'
                            </MDBCardHeader>

                            <MDBCardBody>
                                <MDBTable responsive striped hover bordered>
                                    <MDBTableHead>
                                        <tr>
                                            <th>Item_detail</th>
                                            <th>Qunatity</th>
                                            <th>price</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>

                                        {

                                            this.state.item.map((items, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{items.detail}</td>
                                                        <td>{items.qty}</td>
                                                        <td>{items.price}</td>

                                                    </tr>

                                                )
                                            })}
                                    </MDBTableBody>
                                </MDBTable>
                            </MDBCardBody>
                        </MDBCard>


                    </div>
                </div>
            </div>

        )
    }
}

export default ItemsDetail;
