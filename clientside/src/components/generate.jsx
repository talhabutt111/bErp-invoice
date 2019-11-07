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
            selectedClient: 'ggggggg',
            selectedAddress: '',
            tabrow: '',
            message: '',
            description: '',
            qty: '',
            price: ''

        }

        // console.log('date is ', this.state.date);
        // console.log("serial no is", this.state.invoice_id);
    }

    cleararray = () => {
        this.setState({item: []});
    }

    submit = (e) => {
        e.preventDefault();
        let form = this.generate;
        if (form.checkValidity() === false) {
            form.classList.add('was-validated');
        } else {
            const obj = {
                slagme: this.state.invoice_id,
                name: this.state.selectedClient,
                address: this.state.address,
                number: this.state.phone,
                date: this.state.date,
                services: this.state.services,
                total_amount: this.state.total,

            };
            // console.log(obj)
            axios.post('http://localhost:5000/brp/invoice', obj)
                .then(res => {
                    this.setState({message: res.data.message});
                    console.log(res.data);
                    // this.setState({description:this.state.item[0].description},() =>{
                    //                     //     console.log(this.state.description)})
                    //                     // console.log(this.state.item)
                })
                .catch(err => {
                    console.log(err)
                });
            const Object3 = this.state.item;

            console.log(Object3)
            axios.post('http://localhost:5000/brp/itemsdata', Object3)
                .then(res => {
                    console.log(res)
                })
                .catch(error => console.log(error))
            window.location.reload(3);

        }
    };


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
                // console.log(data);

                this.setState({clients: data}, () => {
                    // console.log(this.state.clients)
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
                pdf.addImage(imgData, 'PNG', 3, 12, 207, 190);

                // pdf.output('dataurlnewwindow');
                pdf.save("invoice.pdf");
            })
        ;
    }

    alertmessage = () => {
        if (this.state.message !== null) {
            return (
                <div>
                    <strong>{this.state.message}</strong>
                </div>


            )
        } else {
            console.log('message error');
        }
    }
    calculateTotal = () => {
        let table = document.getElementById('invoiceTable'), total = 0
        for (let index = 1; index < table.rows.length; index++) {
            total += Number(table.rows[index].cells[2].innerHTML)
            // console.log(typeof(table.rows[index].cells[2].innerHTML));
        }

        // console.log("total is");
        // let total = 0;
        // this.state.item.forEach((items) => {

        //     total += Number(items.price);
        //     console.log(total);
        // });
        this.setState({total: total})

    };


    render() {

        let {total, description, qty, price,item} = this.state;
     //   console.log(item)
        return (
            <div className="container-fluid">
                <form onSubmit={this.submit} ref={ref => this.generate = ref} noValidate>
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
                                            <div className="col-xs-8 col-sm-6 col-md-4 col-lg-3 col-xl-3 pull-right">
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
                                        {this.alertmessage()}
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <br/>

                                                <select value={this.state.selectedClient}
                                                        className="browser-default custom-select"
                                                        onChange={(e) => {
                                                            let ourClient = this.state.clients.filter(client => client.id == e.target.value).shift()
                                                            this.setState({
                                                                selectedClient: ourClient.cl_name,
                                                                address: ourClient.address,
                                                                phone: ourClient.number

                                                            })
                                                        }}
                                                        required>
                                                    <option key={Math.random()}>{this.state.selectedClient}</option>
                                                    {this.state.clients.map((cl) => <option key={cl.id}
                                                                                            value={cl.id}>{cl.cl_name}</option>)}
                                                </select>
                                            </div>
                                            <div className="col-sm-4">
                                                <MDBInput label="address" value={this.state.address}
                                                          // disabled={true}
                                                    required
                                                />

                                            </div>

                                            <div className="col-sm-4">

                                                <MDBInput label="Phone no"
                                                          value={this.state.phone}
                                                          // disabled={true}
                                                          required/>
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
                                                    }} required>
                                                        <option>--Select Services</option>
                                                        <option value="seo">SEO</option>
                                                        <option value="web development">Web Development</option>
                                                        <option value="mob app">MObile App</option>
                                                        <option value="graphic designing">Graphic Designing</option>
                                                    </select>
                                                </div>

                                            </div>
                                            <div className="row">

                                                <div className="col-sm-4">

                                                    <MDBInput id="myinput" label="Item-descrption" value={description}
                                                              type="text"
                                                              onChange={e => {
                                                                  document.getElementById('myinput').style.borderBottomColor = "green"
                                                                  this.setState({description: e.target.value})
                                                              }}

                                                    />
                                                </div>
                                                <div className="col-sm-2">
                                                    <MDBInput id="myinput2" label="Qty" value={qty} type="number"
                                                              min="1" step="1"
                                                              onChange={e => {
                                                                  document.getElementById('myinput2').style.borderBottomColor = "green"
                                                                  this.setState({qty: e.target.value})
                                                              }}

                                                    />
                                                </div>
                                                <div className="col-sm-3">
                                                    <MDBInput id="myinput3" label="Price" value={price} type="number"
                                                              min="1" step="1"
                                                              onChange={e => {
                                                                  document.getElementById('myinput3').style.borderBottomColor = "green"
                                                                  this.setState({price: e.target.value})
                                                              }}

                                                    />
                                                </div>
                                                <div className="col-sm-5">
                                                    <button onClick={(e) => {
                                                        e.preventDefault()
                                                        if (this.state.description === null || this.state.qty === null || this.state.price === null || this.state.description === '' || this.state.qty === '' || this.state.price === '') {
                                                            //       let array=  document.getElementById("myinput");

                                                            //        array.style.borderBottomColor="#FF0000"
                                                            return (
                                                                document.getElementById("myinput").style.borderColor = "#FF0000",
                                                                    document.getElementById("myinput2").style.borderColor = "#FF0000",
                                                                    document.getElementById("myinput3").style.borderColor = "#FF0000"
                                                            )
                                                        } else {

                                                            let newitem = {
                                                                incoice_id: id,
                                                                detail: this.state.description,
                                                                qty: this.state.qty,
                                                                price: this.state.price
                                                            };
                                                            this.setState({
                                                                item: [...this.state.item, newitem],
                                                                description: '',
                                                                qty: '',
                                                                price: ''
                                                            }, function () {
                                                                // console.log('items array is', this.state.item);

                                                            });
                                                        }
                                                    }
                                                    } color="transparent"><MDBIcon icon="plus"/></button>
                                                </div>
                                            </div>
                                            <br/>


                                            <div className="col-md-8">
                                                <table id='invoiceTable' className="table table-bordered">
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
                                                               <td

                                                                    onBlur={(e) =>{
                                                                        let el = e.target;
                                                                        let row = el.closest('tr');
                                                                        var i = row.rowIndex;
                                                                        console.log(index)
                                                                        console.log(i)
                                                                        this.setState({
                                                                            item: [
                                                                                ...this.state.item.slice(0,index),
                                                                                Object.assign({}, this.state.item[index], {detail: el.innerHTML}),
                                                                                ...this.state.item.slice(index+1)
                                                                            ]
                                                                        });
                                                                    }
                                                                     }


                                                                    suppressContentEditableWarning={true}
                                                                    contentEditable={true}>{item.detail}</td>
                                                                <td
                                                                    onBlur={(e) => {
                                                                        let el = e.target;
                                                                        let row = el.closest('tr');
                                                                        var i = row.rowIndex;
                                                                        console.log(index);
                                                                        console.log(i);
                                                                        this.setState({
                                                                            item: [
                                                                                ...this.state.item.slice(0, index),
                                                                                Object.assign({}, this.state.item[index], {qty: el.innerHTML}),
                                                                                ...this.state.item.slice(index + 1)
                                                                            ]
                                                                        });
                                                                    }
                                                                    }


                                                                    suppressContentEditableWarning={true}
                                                                    contentEditable={true}>{item.qty}</td>
                                                                <td
                                                                    onBlur={(e) => {
                                                                    let el = e.target;
                                                                    let row = el.closest('tr');
                                                                    var i = row.rowIndex;
                                                                    console.log(index)
                                                                    console.log(i)
                                                                    this.setState({
                                                                        item: [
                                                                            ...this.state.item.slice(0, index),
                                                                            Object.assign({}, this.state.item[index], {price: el.innerHTML}),
                                                                            ...this.state.item.slice(index + 1)
                                                                        ]
                                                                    });
                                                                }
                                                                }


                                                                    suppressContentEditableWarning={true}
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
                                        onClick={this.submit}
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