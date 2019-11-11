import React, { Component } from "react";
import logo from '../../images/devZone-Logo.png'
import { MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBRow } from "mdbreact";
class Company extends Component {
    render() {
        return (
            <div className="row mt-5 pt-5 justify-content-center">
                {/* <div className="col-sm-3 col-lg-1"></div> */}
                <div className="col-lg-8 col-md-8 col-sm-12 mt-4 pt-4 align-self-center">
                    <MDBCard >
                        <MDBCardHeader tag="h3" style={{ backgroundColor: "#9ACD32", color: "white" }}
                            className="text-center font-weight-bold text-uppercase py-4">
                            We make quality !
                            </MDBCardHeader>
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol md="4" middle>
                                    <img src={logo} width={'200px'} height={'auto'} />
                                </MDBCol>
                                <MDBCol md="8">
                                    <strong>
                                        DevZone Solutions
                                        </strong><br />
                                    Mobile: +92 306 5619198<br />
                                    Email: contact@devzone.com.pk<br />
                                    Address: 42-5-A2 Township, Lahore, Pakistan
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </div>
            </div>
        )
    }
}
export default Company;