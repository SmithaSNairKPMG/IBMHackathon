import React, {Component} from 'react';
import Main from './Main';
import Admin from './Admin';
import  { Link } from 'react-router-dom';

class Home extends Component {

    constructor(props){
        super(props);
          this.state = {
            user: this.props.location.state
          }
        }
  
   
     
    render() {
      let { user } = this.state;
  
      return(
        <div className="main">
            <div className="header"><span>App Name</span><Link  to="/">Logout</Link></div>

            
        { user.role == 'Employee' ? <Main user={user}/> : <Admin/>
    }
        </div>
      )
    }
  }
  
  export default Home;