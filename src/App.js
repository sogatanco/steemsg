import React from 'react';
import Tracking from './Pages/Tracking';
import Home from './Pages/Home';
import FullDelegator from './Pages/FullDelegator';
import Maps from './Pages/Maps';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import {Navbar, Nav, Container, Row, Col} from 'react-bootstrap' ;
import Kartu from './Pages/Kartu';

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
                      <Nav.Link href="tracking/">Power up info</Nav.Link>
                      <Nav.Link href="/delegator">Delegator</Nav.Link>
                      <Nav.Link href="/map">Map</Nav.Link>
                      </Nav>
                  </Navbar.Collapse>
          </Container>
      </Navbar>

  
 
         
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/tracking" exact component={Tracking}/>
          <Route path="/delegator" exact component={FullDelegator}/>
          <Route path="/map" exact component={Maps}/>
          <Route path="/card/:user" exact component={Kartu}/>
        </Switch>
     
      </BrowserRouter>
      
   </>
  );
}

export default App;