import React, { Component } from "react";
import seo from '../../images/SEO-article-header-880x470-c.png';
import web from '../../images/web-development-trends-2018-header-1.jpg';
import mon from '../../images/mobile-app-development-services-in-delhi-india.jpg';
import digit from '../../images/digitalmarketing850.jpg';
import grap from '../../images/graphic_design.jpg'

import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from "mdbreact";

class Services extends Component {
    render() {
        return (
            <div className="container">
                <div className="m-4">
                    <div className="row">
                        <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            <MDBCard style={{ height: "350px" }}>
                                <MDBCardImage className="img-fluid" src={seo} waves />
                                <MDBCardBody>
                                    <MDBCardTitle>SEO</MDBCardTitle>
                                    <MDBCardText>
                                        Some quick example text to build on the card title and make
                                        up the bulk of the card&apos;s content.
                                    </MDBCardText>

                                </MDBCardBody>
                            </MDBCard>
                        </div>
                        <div className="col-sm-4 col-md-4 col-lg-6 col-xl-4">
                            <MDBCard style={{ height: "350px" }}>
                                <MDBCardImage className="img-fluid" src={web} waves />
                                <MDBCardBody>
                                    <MDBCardTitle>WEB Dev</MDBCardTitle>
                                    <MDBCardText>
                                        Some quick example text to build on the card title and make
                                        up the bulk of the card&apos;s content.
                                    </MDBCardText>

                                </MDBCardBody>
                            </MDBCard>
                        </div>
                        <div className="col-sm-4 col-md-4 col-lg-6 col-xl-4">
                            <MDBCard style={{ height: "350px" }}>
                                <MDBCardImage className="img-fluid" src={mon} waves />
                                <MDBCardBody>
                                    <MDBCardTitle>Mobile App</MDBCardTitle>
                                    <MDBCardText>
                                        Some quick example text to build on the card title and make
                                        up the bulk of the card&apos;s content.
                                    </MDBCardText>

                                </MDBCardBody>
                            </MDBCard>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-sm-3 col-md-3 col-lg-1 col-xl-2"></div>
                        <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            <MDBCard style={{ height: "350px" }}>
                                <MDBCardImage className="img-fluid" src={grap} waves />
                                <MDBCardBody>
                                    <MDBCardTitle>Graphics Designing</MDBCardTitle>
                                    <MDBCardText>
                                        Some quick example text to build on the card title and make
                                        up the bulk of the card&apos;s content.
                                    </MDBCardText>

                                </MDBCardBody>
                            </MDBCard>
                        </div>

                        <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            <MDBCard style={{ height: "350px" }}>
                                <MDBCardImage className="img-fluid" src={digit} waves />
                                <MDBCardBody>
                                    <MDBCardTitle>Digital marketing</MDBCardTitle>
                                    <MDBCardText>
                                        Some quick example text to build on the card title and make
                                        up the bulk of the card&apos;s content.
                                    </MDBCardText>

                                </MDBCardBody>
                            </MDBCard>
                        </div>
                    </div>
                </div>


            </div>


        )
    }
}

export default Services;