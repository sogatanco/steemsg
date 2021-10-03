import React from 'react';
import {Container,  Button, Table, Row, Col, Card, Image, Badge, Modal} from 'react-bootstrap' ;


class Tracking extends React.Component{

    constructor(){
        super();
        this.state={
            data:[],
            tes:0,
            data1:[],
            filldata:true,
            users:[],
            show:false
        }
        
    }

    getData(user){
        this.setState({tes:1})
        fetch('https://sds1.steemworld.org/transfers_api/getTransfers/%7B%22type%22:%22transfer_to_vesting%22,%22orderBy%22:%22time%22,%22orderDir%22:%22DESC%22,%22from%22:%22'+user+'%22%7D/1000/0')
        .then(response => response.json())
        .then((jsonData) => {
          this.setState({filldata:false})
          this.setState({data:jsonData.result.rows})
        })
        .catch((error) => {
          this.setState({data:error})
        })
    }

    getDelegator(){
        var users=[]
        var hasiltotal=[]
        fetch('https://sds1.steemworld.org/delegations_api/getIncomingDelegations/promosteem.com/100000/0')
            .then(response=>response.json())
            .then((data)=>{
                var hasil=data.result.rows
                hasil.sort(function(a,b){
                    return parseInt(b[3])- parseInt(a[3]);
                })
                
                hasil.map((hs)=>(
                      users.push(hs[1]) 
                ))
              
                var a=users.toString()
                var b=a.replace(/,/g, '","');
                var c='["'+b+'"]'

                fetch('https://api.steemit.com', {
                body: '{"jsonrpc":"2.0", "method":"condenser_api.get_accounts", "params":['+c+'], "id":1}',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST'
                }).then(response=>response.json())
                .then((data)=>{
                    data.result.map(f=>{
                        if(new Date(f.next_vesting_withdrawal).getTime()>=Date.now()){
                            hasiltotal.push({'name':f.name, 'image':'https://steemitimages.com/u/'+f.name+'/avatar', 'pw':'outline-danger'})
                        }else{
                            hasiltotal.push({'name':f.name, 'image':'https://steemitimages.com/u/'+f.name+'/avatar', 'pw':'outline-primary'})
                        }
                        
                    })

                     this.setState({users:hasiltotal}) 
                })       
        })
        

    }
   
    componentDidMount() {
        this.getDelegator();
    }


    handleClose(){
        this.setState({show:false})
    }

    handleShow(user){
        this.setState({show:true})
        this.getData(user)
    }
 
      

    render(){

        let sum = this.state.data.reduce(function(prev, current) {
            return prev + +current[3]
          }, 0);

            return(
               
                <div>
    
                    <Container className="mt-4">
                    <small><i><b className="text-danger">Red Button</b> is doing power down</i></small>
                        <Row>
                        {this.state.users.map((user)=>(
                           <Col md={4}>
                             <Card className="contes mt-4">
                                 <Card.Body>
                                     <Row>
                                         <Col xs={3}>
                                             <Image src={user.image} roundedCircle fluid/>
                                         </Col>
                                         <Col xs={9}>
                                            <h6>
                                            @{user.name}
                                            </h6>
                                            <Button size="sm" variant={user.pw} onClick={()=>this.handleShow(user.name)}>See Detail</Button>
                                         </Col>
                                     </Row>
                                 </Card.Body>
                             </Card>
                           </Col>
                        ))}
                        </Row>

    
                    </Container>
    
    
                    <Modal show={this.state.show} onHide={()=>this.handleClose()} animation={false} size="lg">
                        <Modal.Header>
                        <Modal.Title>Detail Power Up Activity</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Table striped bordered hover size="sm" responsive>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Username</th>
                                        <th>Amount({sum.toFixed(2)})</th>
                                        <th>Unit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {this.state.data.map((x)=>(
                                        <tr key={x}>
                                        <td>{new Date(x[0]*1000).toLocaleDateString("en-us")}</td>
                                        <td>{x[1]}</td>
                                        <td>{x[3]}</td>
                                        <td>{x[4]}</td>
                                    </tr>
                                    ))}

                                
                                    
                                </tbody>
                            </Table>
                        </Modal.Body>
                    </Modal>
                

                </div>
            );

        

   
        
    }

}

export default Tracking;