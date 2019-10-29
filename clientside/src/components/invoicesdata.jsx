import React,{ Component  } from "react";
class Inovicesdata extends Component{
    constructor(props){
        super(props);
        console.log("this.props",this.props.onrenderchild);
    }
    render() {
        return(
            <tr>
                <td>id</td>
            </tr>
        )
    }
}
export default Inovicesdata;