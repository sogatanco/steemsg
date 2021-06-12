import React from 'react';
import {Container, Table} from 'react-bootstrap';


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
                    hasiltotal.push({'user':hs[1], 'total':(parseInt(hs[3])*this.state.vts).toFixed(2)})
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
        return(
            <>
             <Container className="mt-4">
                <h4>Promosteem.com Delegator</h4>
                <hr></hr>

                <Table striped bordered hover size="sm" responsive>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {this.state.list.map((x)=>(
                                    <tr key={x.user}>
                                    <td>{x.user}</td>
                                    <td>{x.total}</td>
                                </tr>
                                ))}

                               
                                
                            </tbody>
                            </Table>
             </Container>
            </>
        )
    }
}

export default FullDelegator;