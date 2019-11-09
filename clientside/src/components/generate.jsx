import React, { Component } from "react";
import { MDBBtn, MDBCard, MDBCardBody, MDBInput, MDBIcon, } from 'mdbreact';
import invoice from './images/devZone-Logo.png';
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
        this.editingInvoiceId = this.props.id
        this.state = {
            date: new Date().toDateString(),
            invoice_id: Math.floor((Math.random() * 200000) + 1),
            address: '',
            phone: '',
            total: 0,
            selectedClient: '',
            // item: [{ services: 'seo', detail: 'ggd', qty: '3', price: '4' }],
            item: [],
            services: '',
            discount: '',
            clients: [],
            message: '',
            description: '',
            qty: '',
            price: '',
            printInvoice: true
        }
    }

    cleararray = () => {
        this.setState({ item: [] });
    }

    makeStateEmpty = () => {
        console.log('emptying2');

        this.setState({
            invoice_id: Math.floor((Math.random() * 200000) + 1),
            selectedClient: '',
            address: '',
            phone: '',
            item: [],
            services: '',
            description: '',
            qty: '',
            price: '',
            message: '',
        })
    }

    printInvoice = () => {
        if (this.state.printInvoice) {
            const printArea = document.getElementById('capture').innerHTML;
            const wholeContent = document.body.innerHTML;
            document.body.innerHTML = printArea;
            window.print();
            document.body.innerHTML = wholeContent;

            // html2canvas(printArea)
            //     .then((canvas) => {
            //         const imgData = canvas.toDataURL('image/png');
            //         const pdf = new jsPDF();
            //         pdf.addImage(imgData, 'PNG', 3, 12, 207, 100);
            //         pdf.save("invoice.pdf");
            //     });
        }
        setTimeout(() => {
            console.log('emptying');
            this.makeStateEmpty()
        }, 1500)
    }

    submitInvoice = () => {
        let { item } = this.state, total = this.total_amount.value
        // e.preventDefault();
        let form = this.selectClientForm;
        if (form.checkValidity() === false) {
            form.classList.add('was-validated');
        } else if (item.length === 0) {
            this.setState({ message: 'No Invoice Data !' })
            return
        }
        else {
            let { invoice_id, selectedClient, address, phone, date } = this.state
            const obj = {
                slagme: invoice_id,
                name: selectedClient,
                address: address,
                number: phone,
                date: date,
                total_amount: total,
            };
            if (!this.editingInvoiceId) {
                console.log('here');
                console.log(obj);

                axios.post('http://localhost:5000/brp/invoice', obj)
                    .then(res => {
                        console.log(res.data);
                        if (!res.data.error) {
                            this.setState({ message: res.data.message });
                            axios.post('http://localhost:5000/brp/itemsdata', item)
                                .then(res => {
                                    // console.log(res.data)
                                    this.setState({ message: res.data.message });
                                    if (!res.data.error) {
                                        this.selectClientForm.classList.remove('was-validated')
                                        this.printInvoice()
                                    }
                                })
                                .catch(error => console.log(error))
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
            else {
                axios.put(`http://localhost:5000/brp/updateinvoice/${this.editingInvoiceId}`, obj)
                    .then((res) => {
                        // console.log(res.data);
                        if (!res.data.error) {
                            this.setState({ message: res.data.message });
                            axios.delete(`http://localhost:5000/brp/deleteitemsdata/${invoice_id}`)
                                .then((res) => {
                                    // console.log(res.data);
                                    this.setState({ message: res.data.message });
                                    if (!res.data.error) {
                                        axios.post('http://localhost:5000/brp/itemsdata', item)
                                            .then(res => {
                                                // console.log(res.data);
                                                this.setState({ message: res.data.message });
                                                if (!res.data.error) {
                                                    this.selectClientForm.classList.remove('was-validated')
                                                    this.printInvoice()
                                                }
                                            })
                                    }
                                })
                                .catch(err => console.log(err))
                        }
                    })
                    .catch(err => console.log(err))
            }
        };
    }

    componentDidMount = () => {
        fetch("http://localhost:5000/brp/clients")
            .then((response) => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                this.setState({ clients: data }, () => {

                });
            }).catch(error => {
                console.log(error);
            });

        if (this.editingInvoiceId) {
            axios.get('http://localhost:5000/brp/invoices/' + this.props.id)
                .then(response => {
                    // console.log(response);
                    if (!response.data.error) {
                        var editingInvoice = response.data.invoice.shift()
                    }
                    editingInvoice && axios.get('http://localhost:5000/brp/oneitemdata/' + editingInvoice.slagme)
                        .then(response => {
                            // console.log(response);
                            let item = []
                            if (response.data.length !== 0) {
                                response.data.forEach(data => {
                                    item.push(
                                        {
                                            invoice_id: data.invoice_id,
                                            services: data.services,
                                            detail: data.detail,
                                            qty: data.qty,
                                            price: data.price
                                        }
                                    )
                                })
                                this.setState({ item })
                                editingInvoice && this.setState({
                                    date: new Date(editingInvoice.date).toDateString(),
                                    invoice_id: editingInvoice.slagme,
                                    selectedClient: editingInvoice.c_name,
                                    address: editingInvoice.c_address,
                                    phone: editingInvoice.c_number,
                                });
                            }
                        })
                        .catch(err => console.log(err))
                })
                // .then(() => { console.log(this.state.name, this.state.address) })
                .catch(function (error) {
                    console.log(error);
                })
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
        let total = 0;
        this.state.item.length !== 0 && this.state.item.forEach(item => total += Number(item.price))
        return total
    };

    onChangeClient = (e) => {
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
        this.setState({
            [name]: e.target.value
        })
    }

    addItem = (e) => {
        e.preventDefault()
        if (this.addItemForm.checkValidity() === false) {
            this.addItemForm.classList.add('was-validated')
            return
        } else {
            let { invoice_id, description, qty, price, services } = this.state
            let newitem = {
                invoice_id: invoice_id,
                services: services,
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
                this.addItemForm.classList.remove('was-validated')
            });
        }
    }

    tdOnBlur = (index, name) => (e) => {
        let el = e.target
        this.setState({
            item: [
                ...this.state.item.slice(0, index),
                Object.assign({}, this.state.item[index], { [name]: el.innerHTML }),
                ...this.state.item.slice(index + 1)
            ]
        });
    }

    deleteItemData = Index => (e) => {
        this.setState(prevState => ({
            item: prevState.item.filter((itemData, index) => {
                return index !== Index
            })
        }))
    }


    render() {
        let { description, qty, price, date, invoice_id, selectedClient, clients, phone, address, printInvoice } = this.state;
        let companyDetailStyle = { fontSize: '0.8rem' };
        let clientOptions = clients && clients.map((cl) => <option key={cl.id} value={cl.id}>{cl.cl_name}</option>)
        let tableRows = [];
        this.state.item.map((item, index) => {
            tableRows.push(
                <tr key={index} className='text-center'>
                    <td>
                        {item.services}
                    </td>
                    <td
                        onBlur={this.tdOnBlur(index, 'detail')}
                        suppressContentEditableWarning={true}
                        contentEditable={true}
                    >
                        {item.detail}
                    </td>
                    <td
                        onBlur={this.tdOnBlur(index, 'qty')}
                        suppressContentEditableWarning={true}
                        contentEditable={true}
                    >
                        {item.qty}
                    </td>
                    <td
                        onBlur={this.tdOnBlur(index, 'price')}
                        suppressContentEditableWarning={true}
                        contentEditable={true}
                    >
                        {item.price}
                    </td>
                    <td className='printHide'>
                        <MDBBtn size="sm" color="danger" onClick={this.deleteItemData(index)}>
                            <i className="fas fa-trash" />
                        </MDBBtn>
                    </td>
                </tr>
            )
        })


        return (
            <div className="container-fluid">
                <div className="row m-4">
                    <div className="col-sm-11 offset-sm-1" id="capture">
                        {/* <div className="col-sm-12 ml-5" id="capture"> */}
                        <MDBCard>
                            <MDBCardBody>
                                <h2 className="text-center invoiceHeader"
                                    style={{ backgroundColor: "#9ACD32", color: "white" }}>INVOICE</h2>
                                <div className="row m-0 p-0">
                                    <div className="col-sm-3 align-self-center mb-0 mt-4 p-0">
                                        <MDBInput label="Date" className='m-0' disabled value={date} />
                                        <MDBInput label="Id" className='m-0' disabled value={invoice_id} />
                                    </div>
                                    <div className="col-sm-6 align-self-center m-0 p-0">
                                        <img src={invoice} width="100%" height="auto" /> <br />
                                    </div>
                                    <div className="col-md-3 mb-0 mt-4 p-0 align-self-center">
                                        {/* <MDBCard className='m-0 p-0'> */}
                                        {/* <MDBCardBody className='m-0 py-2'> */}
                                        <div className='row mb-2'>
                                            <div className='col-2 text-center  m-0 p-0'>
                                                <i className='fa fa-mobile-alt' />
                                            </div>
                                            <div className='col-10 m-0 p-0 text-left'
                                                style={companyDetailStyle}>
                                                +92 306 5619198
                                                    </div>
                                        </div>
                                        <div className='row mb-2'>
                                            <div className='col-2 text-center  m-0 py-0 pr-0 pl-0'>
                                                <i className='fa fa-envelope' />
                                            </div>
                                            <div className='col-10 m-0 p-0 text-left'
                                                style={companyDetailStyle}>
                                                contact@devzone.com.pk
                                                    </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-2 text-center  m-0 p-0'>
                                                <i className='fa fa-map-marker-alt' />
                                            </div>
                                            <div className='col-10 m-0 p-0 text-left'
                                                style={companyDetailStyle}>
                                                42-5-A2 Township, Lahore, Pakistan
                                                    </div>
                                        </div>
                                        {/* </MDBCardBody> */}
                                        {/* </MDBCard> */}
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
                                <div className="container-fluid m-0 p-0"
                                    style={{ borderStyle: "groove", borderRadius: "10px" }}>
                                    <form onSubmit={this.addItem} className='p-0 printHide' ref={ref => this.addItemForm = ref}
                                        noValidate>
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
                                                    color="transparent"
                                                    className='mb-2'
                                                >
                                                    <MDBIcon icon="plus" />
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="row px-2 mx-0 mt-4"
                                        style={{ display: this.state.item.length === 0 ? 'none' : '' }}>
                                        <div className="col-md-12 m-0">
                                            <div className='m-0 p-0 table-responsive'>
                                                <table id='invoiceTable'
                                                    className="table table-bordered table-hover table-sm">
                                                    <thead className='thead-light text-center'>
                                                        <tr style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                                            <th >Services</th>
                                                            <th>Description</th>
                                                            <th>Qty.</th>
                                                            <th>Price</th>
                                                            <th className='printHide'>Action</th>
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
                                        <div className='col-md-4 offset-md-8'>
                                            <MDBInput label='Total' outline ref={el => this.total_amount = el} value={this.calculateTotal()} />
                                        </div>
                                    </div>
                                </div>
                                <p></p>

                                <div className="row m-0 p-2 justify-content-center printHide">
                                    <div className="col-md-2 align-self-center p-0">
                                        {/* <div className='row m-0 p-0'>
                                            <div className='col m-0 p-0 text-right'>
                                                <input
                                                    type="checkbox"
                                                    checked={printInvoice}
                                                    onChange={() => {
                                                        this.setState({
                                                            printInvoice: !this.state.printInvoice
                                                        })
                                                    }}
                                                    style={{ width: '30px', height: '30px', verticalAlign: 'middle' }}
                                                />
                                            </div>
                                            <div className='col text-left m-0 p-0 align-self-center'>
                                                <p className='m-0 p-0'>Save PDF ?</p>
                                            </div>
                                        </div> */}
                                    </div>
                                        To print invoice, press ctrl+p before saving.
                                    <div className="col-md-3 align-self-center py-0 px-2">
                                        <MDBBtn
                                            color="success"
                                            onClick={this.submitInvoice}
                                            size="md"
                                            className='form-control my-0 mx-2 py-2'
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
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                </div>
            </div>

        )
    }
}

export default Generate;