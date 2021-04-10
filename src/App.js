import React from 'react';
import Tracking from './Pages/Tracking';
import {Route, BrowserRouter, Switch} from 'react-router-dom';

function App() {
  return (
   <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Tracking}/>
      {/* <Route path="/product" exact component={Product}/> */}
    </Switch>
   </BrowserRouter>
  );
}

export default App;