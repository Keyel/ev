import React from 'react';



import { Invoices } from './Components/Invoices';
import { Nav, Navbar } from 'react-bootstrap';
import { Transfers } from './Components/Transfers';
import { AtalanyHonapok } from './Components/Atalany';

const App: React.FC = () => {
  const [page, setPage] = React.useState('invoices')
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">React-Bootstrap-keyel-EV</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" onSelect = { (selectedKey) => selectedKey!== null && setPage(selectedKey) }>
            <Nav.Link eventKey="invoices">Invoices</Nav.Link>
            <Nav.Link eventKey="transfers">Transfers</Nav.Link>
            <Nav.Link eventKey="atalany">Atalany</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>    
      {/* <Container> */}
        {/* <Jumbotron>
          <h1 className="header">
            Invoices
          </h1>
        </Jumbotron> */}

        { page === 'invoices' && <Invoices></Invoices> }
        { page === 'transfers' && <Transfers></Transfers> }
        { page === 'atalany' && <AtalanyHonapok></AtalanyHonapok> }
      {/* </Container> */}
    </>
  );
};

export default App;

