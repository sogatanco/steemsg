import React from 'react';
import {Container, Table, Row, Col, Card, Badge, ProgressBar, Image} from 'react-bootstrap';


class FullDelegator extends React.Component{
    constructor(){
        super();
        this.state={
            list:[],
            vts:0
        }
    }

    vestToSP(){
        fetch('https://anothervps.com/api/steemit/vests/')
            .then(response=>response.json())
            .then((data)=>{
                this.setState({vts:data.vests_to_sp})
            })
    }

    getDelegator1(){
        this.vestToSP()
        var hasiltotal=[]
        fetch('https://sds1.steemworld.org/delegations_api/getIncomingDelegations/promosteem.com/100000/0')
            .then(response=>response.json())
            .then((data)=>{
                var hasil=data.result.rows
                hasil.sort(function(a,b){
                    return parseInt(b[3])- parseInt(a[3]);
                })

                hasil.map(hs=>{
                    hasiltotal.push({'user':hs[1], 'total':(parseInt(hs[3])*this.state.vts).toFixed(0),  'avatar':'https://steemitimages.com/u/'+hs[1]+'/avatar'})
                })

               this.setState({list:hasiltotal})
        })          
   

    }
    componentDidMount() {
        this.timerID = setInterval(
          () => this.getDelegator1(),
          1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render(){
        let sumtotal= this.state.list.reduce(function(prev, current) {
            return prev + +current.total
          }, 0);
        return(

            <>
             <Container className="mt-4">
                <h4>Promosteem.com Delegator</h4>
                <hr></hr>

               

                <Row>
                    {this.state.list.map((x)=>(
                        <Col md={3}>

                        <Card className="contes mt-4">
                            <Card.Body>
                                <Row>
                                    <Col xs={3}>
                                        <Image src={x.avatar} roundedCircle fluid/>
                                    </Col>
                                    <Col xs={9}>
                                        <h6>
                                            @{x.user}
                                        </h6>
                                        <ProgressBar animated variant="primary" now="100" label={`${x.total} SP / ${(x.total/sumtotal*100).toFixed(1)} %`} />
                                    </Col>
                                
                                </Row>
                            </Card.Body>
                        </Card>
                         
                    </Col>
                    ))}


                </Row>
             </Container>
            </>
        )
    }
}

export default FullDelegator;