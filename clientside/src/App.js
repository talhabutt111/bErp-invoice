import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import Clients from "./components/clients/Clients";
import Invoices from "./components/invoices/Invoices";
import Services from "./components/misc/Services";
import Company from "./components/misc/Company";
import GenerateInvoice from "./components/invoices/GenerateInvoice";
import AddClient from "./components/clients/AddClient";
import EditClient from "./components/clients/EditClient";
import EditInvoice from "./components/invoices/EditInvoice ";
import InvoiceDetails from "./components/invoices/InvoiceDetails";
import Error from "./components/misc/404Error";


function App() {

  return (

    <Router>
      <div className="sidenav printHide">
        <MDBDropdown>
          <MDBDropdownToggle
            caret
            outline
            color="success"
            size="md"
          >
            Clients
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem>
              <MDBIcon icon="users" />
              <Link to="/clients/all" >
                Clients list
              </Link>
              <br />
              <br />
            </MDBDropdownItem>
            <MDBDropdownItem>
              <Link to="/clients/add">
                <MDBIcon icon="plus-square" />
                Add Clients
              </Link>
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
        <MDBIcon icon="chart-line" />  <Link to="/invoices/generate"> Generate Invoice</Link><br /><br />
        <MDBIcon icon="file-invoice" /> <Link to="/invoices/all">Invoices</Link><br /><br />
        <MDBIcon icon="cash-register" />   <Link to="/services">Services</Link><br /><br />
        <MDBIcon icon="building" /> <Link to="/company">Company</Link><br /><br />
      </div>
      <div className='m-0 p-0 main'>
        <Switch>
          <Route path="/" exact component={GenerateInvoice} />
          <Route path="/invoices/generate" component={GenerateInvoice} />
          <Route path="/clients/all" component={Clients} />
          <Route path="/invoices/all" component={Invoices} />
          <Route path="/services" component={Services} />
          <Route path="/company" component={Company} />
          <Route path='/clients/edit/:id' component={EditClient} />
          <Route path='/invoices/edit/:id' component={EditInvoice} />
          <Route path='/invoices/invoice_details/:slagme' component={InvoiceDetails} />
          <Route path="/clients/add" component={AddClient} />
          <Route component={Error} />

        </Switch>
      </div>


    </Router>

  );
}

export default App;
