import React, {Component} from 'react';
import axios from 'axios';

class Available extends Component {

    constructor(props){
        super(props);
         this.state = {
             available : 0,
             occupied: 0,
             tokenInQueue : 0
         }
    }
    componentDidMount(){
        this.getavailableseats();
    }
  
    getavailableseats = () => {
        axios.get('/api/checkIns/getavailableseats')
          .then(res => {
            if(res.data){  console.log(res.data)
              this.setState({
                available: res.data.available,
                occupied: res.data.occupied,
                tokenInQueue: res.data.tokenInQueue
              })
            }
          })
          .catch(err => console.log(err))
      }
      componentWillReceiveProps(nextProps,nextState) {
        console.log('componentWillReceiveProps', nextProps);
        console.log('componentWillReceiveProps', this.props);
        this.getavailableseats();
      
    }
    render() {
      let { available,tokenInQueue,occupied } = this.state;
  
      return(
        <React.Fragment>
         {
             available > 0 ?
         <div className="alert alert-success message">Total {available} seat{available > 1 ? <span>s are</span> : <span> is</span>} available at the moment.
             {
               occupied > 0 ? <span> {occupied} seat{occupied > 1 ? <span>s are</span>: <span> is</span>} occupied.</span> : <span> No seats are occupied.</span>
             }
             {
            tokenInQueue > 0 ? <span> {tokenInQueue} {tokenInQueue > 1 ? <span> people are</span>: <span> person is</span>} waiting in queue.</span> : null
             }
             </div> :
             <div className="alert alert-danger">No seats are available at the moment.
             {
               occupied > 0 ? <span> {occupied} seat{occupied > 1 ? <span>s are</span>: <span> is</span>} occupied.</span> : <span> No seats are occupied.</span>
             }
             {
            tokenInQueue > 0 ? <span> {tokenInQueue} {tokenInQueue > 1 ? <span> people are</span>: <span> person is</span>} waiting in queue.</span> : null
             }
             </div>
         }
         </React.Fragment>
      )
    }
  }
  
  export default Available;