import React,{ Component  } from "react";
import error from './images/404 error.png';
class  Error extends Component{
    render() {
        return(
            <div className="container">
                <div className="m-3">
                <div className="row justify-content-center">

                    <div className="col-sm-9 col-md-8 col-lg-12 col-xl-12 p-0 ">
                        <img src={error} className="responsive bg-transparent" />
                    </div>
                </div>
                </div>
            </div>
        )
    }

}
export default Error;