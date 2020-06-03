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
                    <Occupancy/>
<table>
    <tr><td>EmpId</td><td>Name</td></tr>
                    {
                        tokens.map(x =>                        
                                <tr><td>{x.empId}</td><td>{x.name}</td></tr>
                        )
                    }
                    </table>
        </div>
      )
    }
  }
  
  export default Admin;