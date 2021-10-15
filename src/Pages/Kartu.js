import React from "react";
import {Container, Card, Row, Col, Image, Badge, Button} from 'react-bootstrap';
import '../css/kartu.css';
import QRCode from "react-qr-code"


class Kartu extends React.Component{

    print(){
        
    }
    
    render(){
     
        return(
            <Container>
                <Row className="mt-4">
                <Col md={{ span: 6, offset: 3 }}>
                    <Card className="kartu">
                     
                        <Card.Img src="/images/backcard.jpg"/>
                        <Card.ImgOverlay>
                            <Row>
                                <Col xs={{span:5, offset:7}}>
                                    <Image src="/images/promolog.png" fluid/>
                                </Col>
                            </Row>
                                    <br/>
                            <Row>
                            
                                <Col xs={3}>
                                    <Image src={`https://steemitimages.com/u/${this.props.match.params.user}/avatar`} roundedCircle fluid/>
                                </Col>
                                <Col xs={9}>
                                    
                                    <Card.Title className="text-light mt-3">{this.props.match.params.user}</Card.Title>
                                    <Badge pill bg="primary">
                                        steemit.com/@{this.props.match.params.user}
                                    </Badge>
                                </Col>
                            </Row>

                           <Row>
                               <Col xs={{span:3, offset:9}}>
                                 <QRCode value={`https://steemit.com/@${this.props.match.params.user}`} size="90" fluid/>
                               </Col>
                           </Row>
                            
                            

                           
                        </Card.ImgOverlay>
                       
                    </Card>
                   
                </Col>
                </Row>
            </Container>
        )
    }
}

export default Kartu;