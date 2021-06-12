import React from 'react';
import Tracking from './Pages/Tracking';
import Delegator from './Pages/Delegator';
import FullDelegator from './Pages/FullDelegator';
import {Route, BrowserRouter, Switch, Link, NavLink} from 'react-router-dom';
import {Navbar, Nav, Container, Row, Col} from 'react-bootstrap' ;

function App() {
  return (
    <>
     <BrowserRouter>
      <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
          <Navbar.Brand href="/">PromoSteem.com</Navbar.Brand>
         
             
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto">
                      <Nav.Link href="/">Power up info</Nav.Link>
                      <Nav.Link href="/delegator">Delegator</Nav.Link>
                      </Nav>
                  </Navbar.Collapse>
          </Container>
      </Navbar>

      <Container>
        <Row>
          <Col lg={3} md={12} className="d-none d-lg-block">
              <Delegator></Delegator>
          </Col>
          <Col lg={9} md={12}>
         
        <Switch>
          <Route path="/" exact component={Tracking}/>
          <Route path="/delegator" exact component={FullDelegator}/>
        </Switch>
     
          </Col>
        </Row>
      </Container>
      </BrowserRouter>
      
   </>
  );
}

export default App;