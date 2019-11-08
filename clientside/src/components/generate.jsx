import React, { Component } from "react";
import { MDBBtn, MDBCard, MDBCardBody, MDBInput, MDBIcon, } from 'mdbreact';
import invoice from './devZone-Logo.png';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';

// const today = new Date();
// const mydate = today.toDateString();
// const id = Math.floor((Math.random() * 200000) + 1);
const servicesOptions = [
    { value: 'seo', label: 'SEO' },
    { value: 'web development', label: 'WEB DEVELOPMENT' },
    { value: 'graphic designing', label: 'Graphics Designing' },
    { value: 'mobile apps', label: 'Mobile Apps' }
];


class Generate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date().toDateString(),
            invoice_id: Math.floor((Math.random() * 200000) + 1),
            name: '',
            address: '',
            phone: '',
            services: '',
            revisions: '',
            item: [],
            total: 0,
            discount: '',
            clients: [],
            selectedClient: '',
            selectedAddress: '',
            tabrow: '',
            message: '',
            description: '',
            qty: '',
            price: ''
        }
    }

    cleararray = () => {
        this.setState({ item: [] });
    }

    submitInvoice = () => {
        let { item, total } = this.state
        // e.preventDefault();
        let form = this.selectClientForm;
        if (form.checkValidity() === false) {
            form.classList.add('was-validated');
        }
        else if (item.length === 0) {
            this.setState({ message: 'No Invoice Data !' })
            return
        }
        else if (total === 0) {
            this.setState({ message: 'Please calculate first !' })
            return
        }
        else {
            let { invoice_id, selectedClient, address, phone, date, services, total } = this.state
            const obj = {
                slagme: invoice_id,
                name: selectedClient,
                address: address,
                number: phone,
                date: date,
                services: services,
                total_amount: total,
            };
            // console.log(obj)
            axios.post('http://localhost:5000/brp/invoice', obj)
                .then(res => {
                    this.setState({ message: res.data.message });
                    console.log(res.data);
                    // this.setState({description:this.state.item[0].description},() =>{
                    //                     //     console.log(this.state.description)})
                    //                     // console.log(this.state.item)
                })
                .catch(err => {
                    console.log(err)
                });
            const itemData = item;

            console.log(itemData)
            axios.post('http://localhost:5000/brp/itemsdata', itemData)
                .then(res => {
                    console.log(res)
                })
                .catch(error => console.log(error))
            setTimeout(function () {
                window.location.reload();
            }, 2000)
        }
    };

    componentDidMount = () => {
        fetch("http://localhost:5000/brp/clients")
            .then((response) => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                this.setState({ clients: data }, () => {
                    // console.log(this.state.clients)
                });
            }).catch(error => {
                console.log(error);
            });
    }

    saveDocumentToPdf = () => {
        if (this.state.item.length !== 0) {
            const input = document.getElementById('capture');
            html2canvas(input)
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF();
                    pdf.addImage(imgData, 'PNG', 3, 12, 207, 190);
                    // pdf.output('dataurlnewwindow');
                    pdf.save("invoice.pdf");
                });
        }
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
        let table = document.getElementById('invoiceTable'), { total } = this.state
        for (let index = 1; index < table.rows.length; index++) {
            total += Number(table.rows[index].cells[2].innerHTML)
            // console.log(typeof(table.rows[index].cells[2].innerHTML));
        }
        this.setState({ total: total })
    };

    onChangeClient = (e) => {
        // console.log('changeClient');
        let ourClient = this.state.clients.filter(client => client.id == e.target.value).shift()
        ourClient ?
            this.setState({
                selectedClient: ourClient.id,
                address: ourClient.address,
                phone: ourClient.number
            })
            :
            this.setState({
                selectedClient: '',
                address: '',
                phone: ''
            })
    }

    onChange = name => e => {
        // console.log('change');
        this.setState({
            [name]: e.target.value
        })
    }

    addItem = (e) => {
        e.preventDefault()
        if (this.addItemForm.checkValidity() === false) {
            this.addItemForm.classList.add('was-validated')
            return
        }
        else {
            let { invoice_id, description, qty, price } = this.state
            let newitem = {
                incoice_id: invoice_id,
                detail: description,
                qty: qty,
                price: price
            };
            this.setState({
                item: [...this.state.item, newitem],
                description: '',
                qty: '',
                price: '',
                services: ''
            }, function () {
                // console.log('items array is', this.state.item);
                this.addItemForm.classList.remove('was-validated')
            });
        }
    }

    tdOnBlur = index => (e) => {
        let el = e.target;
        let row = el.closest('tr');
        var i = row.rowIndex;
        // console.log(index)
        // console.log(i)
        this.setState({
            item: [
                ...this.state.item.slice(0, index),
                Object.assign({}, this.state.item[index], { detail: el.innerHTML }),
                ...this.state.item.slice(index + 1)
            ]
        });
    }



    render() {

        let { total, description, qty, price, date, invoice_id, selectedClient, clients, phone, address } = this.state;
        let companyDetailStyle = { fontSize: '0.8rem' }
        let clientOptions = clients && clients.map((cl) => <option key={cl.id} value={cl.id}>{cl.cl_name}</option>)
        let tableRows = []
        this.state.item.map((item, index) => {
            tableRows.push(
                <tr key={index} className='text-center'>
                    <td
                        onBlur={this.tdOnBlur(index)}
                        suppressContentEditableWarning={true}
                        contentEditable={true}
                    >
                        {item.detail}
                    </td>
                    <td
                        onBlur={this.tdOnBlur(index)}
                        suppressContentEditableWarning={true}
                        contentEditable={true}
                    >
                        {item.qty}
                    </td>
                    <td
                        onBlur={this.tdOnBlur(index)}
                        suppressContentEditableWarning={true}
                        contentEditable={true}
                    >
                        {item.price}
                    </td>
                </tr>
            )
        })
        //   console.log(item)


        return (
            <div className="container-fluid">
                <div className="row m-4">
                    <div className="col-sm-11 offset-sm-1">
                        <MDBCard id="capture">
                            <MDBCardBody>
                                <h2 className="text-center"
                                    style={{ backgroundColor: "#9ACD32", color: "white" }}>INVOICE</h2>
                                <div className="row m-0 p-0">
                                    <div className="col-sm-3 align-self-center m-0 p-0">
                                        <MDBInput label="Date" disabled value={date} />
                                        <MDBInput label="Id" disabled value={invoice_id} />
                                    </div>
                                    <div className="col-sm-6 align-self-center m-0 p-0">
                                        <img src={invoice} width="100%" height="auto" /> <br />
                                    </div>
                                    <div className="col-md-3 m-0 p-0 align-self-center">
                                        <MDBCard className='m-0 p-0'>
                                            <MDBCardBody className='m-0 py-2'>
                                                <div className='row'>
                                                    <div className='col-2 text-center  m-0 p-0'>
                                                        <i className='fa fa-mobile-alt' />
                                                    </div>
                                                    <div className='col-10 m-0 p-0 text-left' style={companyDetailStyle}>
                                                        +92 306 5619198
                                                        </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-2 text-center  m-0 py-0 pr-0 pl-0'>
                                                        <i className='fa fa-envelope' />
                                                    </div>
                                                    <div className='col-10 m-0 p-0 text-left' style={companyDetailStyle}>
                                                        contact@devzone.com.pk
                                                        </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-2 text-center  m-0 p-0'>
                                                        <i className='fa fa-map-marker-alt' />
                                                    </div>
                                                    <div className='col-10 m-0 p-0 text-left' style={companyDetailStyle}>
                                                        42-5-A2 Township, Lahore, Pakistan
                                                        </div>
                                                </div>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </div>
                                </div>
                                {this.alertmessage()}
                                <form ref={el => this.selectClientForm = el} noValidate>
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <br />
                                            <select
                                                value={selectedClient}
                                                // defaultValue={'Select Client/..'}
                                                className="browser-default custom-select mt-1"
                                                // placeholder={'Select Client'}
                                                onChange={this.onChangeClient}
                                                required
                                            >
                                                <option key={Math.random()} value='' disabled>Select Client...</option>
                                                {clientOptions}
                                            </select>
                                        </div>
                                        <div className="col-sm-4">
                                            <MDBInput
                                                label="Address"
                                                value={address}
                                                disabled
                                                required
                                                validate
                                            />
                                        </div>
                                        <div className="col-sm-4">
                                            <MDBInput
                                                label="Phone"
                                                value={phone}
                                                disabled
                                                required />
                                        </div>
                                    </div>
                                </form>
                                <div className="container-fluid m-0 p-0" style={{ borderStyle: "groove", borderRadius: "10px" }}>
                                    <form onSubmit={this.addItem} className=' p-0' ref={ref => this.addItemForm = ref} noValidate>
                                        <div className="row px-2 m-0">
                                            <div className="col-md-4 m-0">
                                                <br />
                                                <select
                                                    className="form-control mt-1"
                                                    onChange={this.onChange('services')}
                                                    required
                                                    value={this.state.services}
                                                >
                                                    <option value='' disabled>Select Services...</option>
                                                    <option value="seo">SEO</option>
                                                    <option value="web development">Web Development</option>
                                                    <option value="mob app">Mobile App</option>
                                                    <option value="graphic designing">Graphic Designing</option>
                                                </select>
                                            </div>
                                            <div className="col-md-4 m-0">
                                                <MDBInput
                                                    label="Item-descrption"
                                                    value={description}
                                                    type="text"
                                                    onChange={this.onChange('description')}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-1 m-0">
                                                <MDBInput
                                                    label="Qty"
                                                    value={qty}
                                                    type="number"
                                                    min="1"
                                                    onChange={this.onChange('qty')}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-2 m-0">
                                                <MDBInput
                                                    label="Price"
                                                    value={price}
                                                    type="number"
                                                    min="1"
                                                    onChange={this.onChange('price')}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-1 m-0 pt-2  align-self-center">
                                                <button
                                                    type='submit'
                                                    // onClick={this.addItem}
                                                    color="transparent"
                                                    className='mb-2'
                                                >
                                                    <MDBIcon icon="plus" />
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="row px-2 m-0" style={{ display: this.state.item.length === 0 ? 'none' : '' }}>
                                        <div className="col-md-8 m-0">
                                            <div className='m-0 p-0 table-responsive'>
                                                <table id='invoiceTable' className="table table-bordered table-hover table-sm">
                                                    <thead className='thead-light text-center'>
                                                        <tr>
                                                            <th>Description</th>
                                                            <th>Qty.</th>
                                                            <th>Price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {tableRows}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row px-2 m-0" style={{ display: this.state.item.length === 0 ? 'none' : '' }}>
                                        <div className="col-sm-8 align-self-center">
                                            <MDBBtn
                                                color="transparent"
                                                onClick={this.calculateTotal}
                                                className='m-0'
                                            >
                                                Calculate
                                                </MDBBtn>
                                            <MDBBtn
                                                onClick={this.cleararray}
                                                color="transparent"
                                            >
                                                <MDBIcon icon="broom" />
                                            </MDBBtn>
                                        </div>
                                        <div className='col-sm-4'>
                                            <MDBInput label='Total' outline value={total} />
                                        </div>
                                    </div>
                                </div>
                                <p></p>

                            </MDBCardBody>
                        </MDBCard>
                        <div className='text-center'>
                            <MDBBtn
                                onClick={this.saveDocumentToPdf}
                                color="info"
                                size="md"
                            >
                                <MDBIcon
                                    icon="file-pdf"
                                    size="lg"
                                    className='mr-1'
                                />
                                Convert to PDF
                            </MDBBtn>
                            <MDBBtn
                                color="success"
                                onClick={this.submitInvoice}
                                size="md"
                            >
                                <MDBIcon
                                    icon="save"
                                    size="lg"
                                    className='mr-1'
                                />
                                Save Record
                        </MDBBtn>
                        </div>
                    </div>
                </div>
                {/* </form> */}
            </div >

        )
    }
}

export default Generate;