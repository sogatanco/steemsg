import React, { useCallback }  from 'react';
import {Navbar, Nav, Container, Button, ButtonGroup, Table} from 'react-bootstrap' ;


class Tracking extends React.Component{

    constructor(){
        super();
        this.state={
            data:[],
            filldata:true,
            users:['arie.steem', 'pojan', 'ponpase', 'julstamban', 'mcsamm', 'nattybongo', 'cryptokraze', 'michaelchijioke', 'oscarcc89']
        }
        
    }

    getData(user){
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

  
   

    render(){

        let sum = this.state.data.reduce(function(prev, current) {
            return prev + +current[3]
          }, 0);

          console.log(sum)
            return(
               
                <div>
                     <Navbar bg="dark" variant="dark" expand="lg">
                        <Container>
                            <Navbar.Brand href="#home">PromoSteem.com</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto">
                                    <Nav.Link href="">Power up info</Nav.Link>
                                    {/* <Nav.Link href="#link">Link</Nav.Link> */}
                                    </Nav>
                                </Navbar.Collapse>
                        </Container>
                    </Navbar>
    
                    <Container className="mt-4">
                        <ButtonGroup aria-label="Basic example" size="sm" className="flex-wrap">
                            {this.state.users.map((user)=>(
                                <Button className="mb-2" key={user} variant="secondary" onClick={()=>this.getData(user)}>{user}</Button>
                            ))}
                           
                        </ButtonGroup>
    
                        <Table striped bordered hover size="sm" responsive>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Username</th>
                                    <th>Amount({sum})</th>
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
    
                    </Container>
    
    
    
                
                </div>
            );

        

   
        
    }

}

export default Tracking;