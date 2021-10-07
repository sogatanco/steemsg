import React from "react";
import {Carousel} from "react-bootstrap";

class Home extends React.Component{
    render(){
        return(
            <>
               <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmc9NYMX3YZvsCwz1fy8f7we4Kf56dMuxmYmG5quVauuPo/heheheew5.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  
   
</Carousel>
            </>
        )
    }
}

export default Home;