import React from 'react';
import {Container, Button, ButtonGroup, Table} from 'react-bootstrap' ;


class Tracking extends React.Component{

    constructor(){
        super();
        this.state={
            data:[],
            tes:0,
            data1:[],
            filldata:true,
            users:[]
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
                
                hasil.map(hs=>{  
                      users.push(hs[1]) 
                })
              
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
                            hasiltotal.push({'name':f.name, 'pw':'danger'})
                        }else{
                            hasiltotal.push({'name':f.name, 'pw':'primary'})
                        }
                        
                    })

                     this.setState({users:hasiltotal}) 
                })       
        })
        

    }
   
    componentDidMount() {
        this.getDelegator();
    }

 
      

    render(){

        let sum = this.state.data.reduce(function(prev, current) {
            return prev + +current[3]
          }, 0);

            return(
               
                <div>
    
                    <Container className="mt-4">
                        <ButtonGroup aria-label="Basic example" size="sm" className="flex-wrap">
                            {this.state.users.map((user)=>(
                                <Button className="mb-2" key={user.name} variant={user.pw} onClick={()=>this.getData(user.name)}>{user.name}</Button>
                            ))}
                           
                        </ButtonGroup>
                        <small><i><b className="text-danger">*</b> is doing power down</i></small>
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
    
                    </Container>
    
    
    
                
                </div>
            );

        

   
        
    }

}

export default Tracking;