import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import Client from "./components/client";
import Invoices from "./components/invoices";
import Services from "./components/services";
import Company from "./components/company";
import Generate from "./components/generate";
import { MDBIcon } from "mdbreact";
import addClient from "./components/Addclient";
import editClient from "./components/editClient";
import editInvoice from "./components/editInvoice";
import ItemsDetail from "./components/items_details";


function App() {
  return (
    <Router>

      <div className="sidenav">
        <MDBDropdown>
          <MDBDropdownToggle
            caret
            outline
            color="success"
            size="lg"
          >
            Clients
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem> <MDBIcon icon="users" /> <Link to="/client" >Clients list</Link><br /><br /></MDBDropdownItem>
            <MDBDropdownItem> <Link to="/addClient">  <MDBIcon icon="plus-square" /> Add Clients</Link></MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
        <MDBIcon icon="chart-line" />  <Link to="/generate"> Generate Invoice</Link><br /><br />
        <MDBIcon icon="file-invoice" /> <Link to="/invoices">Invoices</Link><br /><br />
        <MDBIcon icon="cash-register" />   <Link to="/services">Services</Link><br /><br />
        <MDBIcon icon="building" /> <Link to="/company">Company</Link><br /><br />
      </div>
      <Switch>
        <Route path="/generate" component={Generate} />
        <Route path="/client" component={Client} />
        <Route path="/invoices" component={Invoices} />
        <Route path="/services" component={Services} />
        <Route path="/company" component={Company} />
        <Route path='/edit/:id' component={editClient} />
        <Route path='/editinvoice/:id' component={editInvoice} />
        <Route path='/itemsdetail/:slagme' component={ItemsDetail} />
        <Route path="/addClient" component={addClient} />
      </Switch>


    </Router>

  );
}

export default App;
