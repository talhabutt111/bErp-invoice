import React, {Component} from "react";
import {MDBBtn, MDBCard, MDBCardBody, MDBInput, MDBIcon,} from 'mdbreact';
import invoice from './devZone-Logo.png';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';

const today = new Date();
const mydate = today.toDateString();
const id = Math.floor((Math.random() * 200000) + 1);
const options = [
    {value: 'seo', label: 'SEO'},
    {value: 'web development', label: 'WEB DEVELOPMENT'},
    {value: 'graphic designing', label: 'Graphics Designing'},
    {value: 'mobile apps', label: 'Mobile Apps'}
];
const option1 = [
    {value: 'no', label: 'none'},
    {value: '2', label: '2'},
    {value: '4', label: '4'},
    {value: '6', label: '6'},

];


class Generate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: mydate,
            invoice_id: id,
            name: '',
            address: '',
            phone: '',
            services: '',
            revisions: '',
            item: [],
            total: '',
            discount: '',
            clients: [],
            selectedClient: '',
            tabrow: '',
            message: ''


        }

        console.log('date is ', this.state.date);
        console.log("serial no is", this.state.invoice_id);
    }

    cleararray = () => {
        this.setState({item: []});
    }

    /*
updateRow=(e)=>{

    let updatedItem = {
        description: this.state.description,
        qty: this.state.qty,
        price: this.state.price
    };

    this.setState({item: [...this.state.updateditem,updatedItem]}, function () {
        console.log(this.state.item);
    });

}*/
    componentDidMount() {
        fetch("http://localhost:5000/brp/clients")
            .then((response) => {
                return response.json();
            })
            .then(data => {
                console.log(data);

                this.setState({clients: data}, () => {
                    console.log(this.state.clients)
                });
            }).catch(error => {
            console.log(error);
        });
    }

    printDocument() {
        const input = document.getElementById('capture');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 3, 12, 205, 190);

                // pdf.output('dataurlnewwindow');
                pdf.save("invoice.pdf");
            })
        ;
    }

alertmessage=() =>{
        if (this.state.message !==null)
        {
            return(
                <div>
                    <strong>{this.state.message}</strong>
                </div>


            )
        }
        else {
            console.log('message error');
        }
}
    calculateTotal = () => {
        console.log("total is");
        let total = 0;
        this.state.item.forEach((items) => {

            total += Number(items.price);
            console.log(total);


        });
        this.setState({total: total})
    };
    submit = (e) => {
        e.preventDefault()
        let obj2 = {
            invoice_id: this.state.invoice_id,
            name: this.state.selectedClient,
            address: this.state.address,
            number: this.state.phone,
            date: this.state.date,
            services: this.state.services,
            items: this.state.item,
            total: this.state.total
        };
        console.log('object to backen holds',obj2);
        axios.post('http://localhost:5000/brp/invoice', obj2)
            .then(res => {
                    this.setState({message: res.data.message});
                    console.log(this.state.message);
                }
            );

    };

    render() {
        let {total} = this.state;

        return (
            <div className="container-fluid">
                <form onSubmit={this.submit} ref={ref => this.myForm = ref} noValidate>
                    <div className="m-4">
                        <div className="row">
                            <div className="col-sm-1"></div>
                            <div className="col-sm-11">
                                <MDBCard id="capture">
                                    <MDBCardBody>
                                        <h2 className="text-center"
                                            style={{backgroundColor: "#9ACD32", color: "white"}}>INVOICE</h2>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <img src={invoice} width="220px" height="auto"/> <br/>
                                                <MDBInput label="Creation Date" value={mydate}
                                                />
                                                <MDBInput label="Invoice-id" value={id}
                                                />
                                            </div>
                                            <div className="col-sm-6"></div>
                                            <div className="col-sm-3 pull-right">
                                                <MDBCard>
                                                    <MDBCardBody>
                                                        <strong>
                                                            DevZone Solutions
                                                        </strong><br/>
                                                        Mobile: +92 306 5619198<br/>
                                                        Email:contact@devzone.com.pk<br/>
                                                        Address: 42-5-A2 Township, Lahore, Pakistan<br/>
                                                    </MDBCardBody>
                                                </MDBCard>

                                            </div>
                                        </div>
                                        { this.alertmessage()}
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <br/>
                                                <select value={this.state.selectedClient}
                                                        className="browser-default custom-select"
                                                        onChange={(e) => this.setState({selectedClient: e.target.value})}>
                                                    {this.state.clients.map((cl) => <option key={cl.id}
                                                                                            value={cl.cl_name}>{cl.cl_name}</option>)}
                                                </select>
                                            </div>
                                            <div className="col-sm-4">
                                                <MDBInput label="Address" onChange={e => {
                                                    this.setState({address: e.target.value})
                                                }}/>
                                            </div>
                                            <div className="col-sm-4">
                                                <MDBInput label="Phone no" onChange={e => {
                                                    this.setState({phone: e.target.value})
                                                }}/>
                                            </div>
                                        </div>
                                        <div className="container-fluid"
                                             style={{borderStyle: "groove", borderRadius: "10px"}}>
                                            <strong className="text-center">Select services</strong>
                                            <p></p>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    Services
                                                    <select className="form-control" onChange={event => {
                                                        this.setState({services: event.target.value})
                                                    }}>
                                                        <option value="seo">SEO</option>
                                                        <option value="web development">Web Development</option>
                                                        <option value="mob app">MObile App</option>
                                                        <option value="graphic designing">Graphic Designing</option>
                                                    </select>
                                                </div>
                                                <div className="col-sm-3">
                                                    Revisions
                                                    <select className="form-control" onChange={event => {
                                                        this.setState({revisions: event.target.value})
                                                    }}>
                                                        <option value="none">none</option>
                                                        <option value="2">2</option>
                                                        <option value="4">4</option>
                                                        <option value="6">6</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <MDBInput label="Item-descrption" onChange={e => {
                                                        this.setState({description: e.target.value})
                                                    }}/>
                                                </div>
                                                <div className="col-sm-2">
                                                    <MDBInput label="Qty" onChange={e => {
                                                        this.setState({qty: e.target.value})
                                                    }}/>
                                                </div>
                                                <div className="col-sm-3">
                                                    <MDBInput label="Price" onChange={e => {
                                                        this.setState({price: e.target.value})
                                                    }}/>
                                                </div>
                                                <div className="col-sm-5">
                                                    <button onClick={(e) => {
                                                        e.preventDefault()
                                                        let newitem = {
                                                            description: this.state.description,
                                                            qty: this.state.qty,
                                                            price: this.state.price
                                                        };
                                                        this.setState({item: [...this.state.item, newitem]}, function () {
                                                            console.log(this.state.item);
                                                        });

                                                    }} color="transparent"><MDBIcon icon="plus"/></button>
                                                </div>
                                            </div>
                                            <br/>


                                            <div className="col-md-8">
                                                <table className="table table-bordered">
                                                    <thead>
                                                    <tr>
                                                        <th>Description</th>
                                                        <th>qunatity</th>
                                                        <th>price</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.item.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td suppressContentEditableWarning={true}
                                                                    contentEditable={true}>{item.description}</td>
                                                                <td suppressContentEditableWarning={true}
                                                                    contentEditable={true}>{item.qty}</td>
                                                                <td suppressContentEditableWarning={true}
                                                                    contentEditable={true}>{item.price}</td>

                                                            </tr>

                                                        )
                                                    })}
                                                    </tbody>

                                                </table>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-9"><MDBBtn color="transparent"
                                                                                  onClick={this.calculateTotal}>Calculated</MDBBtn>
                                                    <MDBBtn onClick={this.cleararray} color="transparent"><MDBIcon
                                                        icon="broom"/></MDBBtn>
                                                </div>
                                                <div className="col-sm-2">
                                                    RS <textarea onChange={() => {
                                                }} className="form-control" placeholder="Total" value={total}/>
                                                    <p></p>
                                                </div>
                                            </div>

                                        </div>
                                        <p></p>

                                    </MDBCardBody>
                                </MDBCard>

                                <MDBBtn onClick={this.printDocument} color="info" className="pull-right"
                                        size="md"><MDBIcon icon="file-pdf" size="lg"/> Convert to PDF</MDBBtn>
                                <MDBBtn color="success" type="submit"
                                        size="md"><MDBIcon icon="save" size="lg"/> Save Record</MDBBtn>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        )
    }
}

export default Generate;