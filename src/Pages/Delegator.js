import React from 'react';
import {Card, ProgressBar} from 'react-bootstrap';
import { Link,} from 'react-router-dom';


class Delegator extends React.Component{

    constructor(){
        super();
        this.state={
            list:[],
            vts:0,
            totald:0
        }
        

    }

    vestToSP(){
        fetch('https://anothervps.com/api/steemit/vests/')
            .then(response=>response.json())
            .then((data)=>{
                this.setState({vts:data.vests_to_sp})
            })
    }

    getDelegator(){
        this.vestToSP()
        var hasildelegator=[]
        fetch('https://sds1.steemworld.org/delegations_api/getIncomingDelegations/promosteem.com/100000/0')
            .then(response=>response.json())
            .then((data)=>{
                var hasil=data.result.rows
                hasil.sort(function(a,b){
                    return parseInt(b[3])- parseInt(a[3]);
                })

                hasil.map(hs=>{
                    hasildelegator.push({'user':hs[1], 'total':(parseInt(hs[3])*this.state.vts).toFixed(2)})
                })

               this.setState({list:hasildelegator})
        })  
    }

   
    componentDidMount() {
        this.timerID = setInterval(
          () => this.getDelegator(),
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
                <Card className="mt-4">
                    <Card.Body>
                        <h4>Top 20 Delegators</h4>
                        <hr></hr> 
                        
                        
                            {this.state.list.slice(0,19).map((x)=>(
                                <div key={x.user} className="mb-2">
                                    <small>{x.user} / {x.total} sp</small>
                                    <ProgressBar animated now={x.total/sumtotal*100}  />
                                </div>
                               
                            ))}
                    
                    <Link to={{ pathname: '/delegator/'}}>See More</Link>

                    </Card.Body>
                </Card>
            </>
        )
    }

}

export default Delegator;