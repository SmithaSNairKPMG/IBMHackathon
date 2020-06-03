import React, {Component} from 'react';
import axios from 'axios';
import Occupancy from '../Occupancy/Occupancy';

class Admin extends Component {

    constructor(props){
        super(props);
          this.state = {
            tokens: []
          }
        }
  
    componentDidMount(){
        this.getAdminData();
    }
  
    getAdminData = () => {
        let data ={
            tokenStatus: 'Accepted'
        }
        axios.post('/api/tokens/getTokensByStatus', data)
        .then(res => {
          if(res.data){ 
         this.setState({
          tokens : res.data
         })
        }
          else{
              console.log('Invalid')
          }
        })
        .catch(err => console.log(err))
    }
       
    render() {
      let { tokens } = this.state;
  
      return(
        <div>
          <div className="container" id="admin">
          <div id="booking-form" className="booking-form">
                    <Occupancy/>
                    </div>
        </div>
        <div  className="admin">
        <section>
         
  <h1>Token Summary</h1>
  <div class="tbl-header">
    <table cellpadding="0" cellspacing="0" border="0">
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Name</th>
          <th>Token Status</th>
          <th>Token Issued/Queued Time</th>
        </tr>
      </thead>
    </table>
  </div>
  <div class="tbl-content">
    <table cellpadding="0" cellspacing="0" border="0">
      <tbody>
      {
          tokens.map(x => 
        <tr>
          <td>{x.empId}</td>
          <td>{x.name}</td>
          <td>{x.tokenStatus}</td>
          <td>{x.time}</td>
        </tr>
          )
    }
      </tbody>
    </table>
  </div>
</section>
</div>

       </div>
      )
    }
  }
  
  export default Admin;