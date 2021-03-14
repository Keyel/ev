import React from 'react';


import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

import { Invoices } from './Components/Invoices';
import { Button } from 'react-bootstrap';

const App: React.FC = () => {
  return (
    <Container className="p-3">
      <Jumbotron>
        <h1 className="header">
          Invoices
        </h1>
      </Jumbotron>

      <Invoices></Invoices>
    </Container>
  );
};

export default App;

