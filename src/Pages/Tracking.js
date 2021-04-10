import React  from 'react';
import steem from 'steem';

class Tracking extends React.Component{

    constructor(){
        super();
        
    }

    render(){
        steem.api.getAccounts(['ned', 'dan'], function(err, result) {
            console.log(err, result);
        });
   
        return(
            <div>dgsdgsdg</div>
        );
    }

}

export default Tracking;