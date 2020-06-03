import React, {Component} from 'react';
import axios from 'axios';

class Available extends Component {

    constructor(props){
        super(props);
         this.state = {
             available : 0
         }
    }
    componentDidMount(){
        this.getavailableseats();
    }
  
    getavailableseats = () => {
        axios.get('/api/checkIns/getavailableseats')
          .then(res => {
            if(res.data){  console.log(res.data.available > 0)
              this.setState({
                available: res.data.available
              })
            }
          })
          .catch(err => console.log(err))
      }

    render() {
      let { available } = this.state;
  
      return(
        <React.Fragment>
         {
             available > 0 ?
             <div className="alert alert-success message">Total {available} seats are available at the moment.</div> :
             <div className="alert alert-warning">No seats are available at the moment.</div>
         }
         </React.Fragment>
      )
    }
  }
  
  export default Available;