import React, {Component} from 'react';
import axios from 'axios';
import ValidationError from './ValidationError';

class Registration extends Component {

  constructor(props){
    super(props);
      this.state = {
        user: {},
      error:''
      }
    }
  
  
    handleChange = (e) => {
        const user = this.state.user;
        user[e.target.name] = e.target.value;
        this.setState({
          user: user
        })
      }

      register = () => {
        const user = this.state.user;
        const data = {name: user.name, 
            email: user.email, 
            empId : user.empId,
            password: user.password
        }
    console.log(data)
    
        if(data.name && data.email && data.empId && data.password){ console.log(this.state)
          if(user.password != user.confirmPassword){
            this.setState({error : 'Passwords do not match'});
          }
          else{
          axios.post('/api/users/register', data)
            .then(res => {
              if(res.data){
                console.log('Registered successfully');
                window.location = "/";
              }
            }, (err => { 
              this.setState({error : err.response.data.error});
            }))
            .catch(err => console.log(err))
          }
        }else {
          this.setState({error : 'Input fields required'});
        }
      }

    render() {
      let { user } = this.state;
  
      return(
       

        <div class="animated slideInLeft" id="square">    
        <div class="animated bounceInUp" id="leftSquare">
          <div class="animated bounceInUp" id="circle">
          <img class="brand img-responsive" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/827672/branding.png" />
          
          </div>
                  
  <h2 id="title">Welcome to Divider</h2>
          <h3 id="subtitle">You are moments away from your first adventure.</h3>
        
       </div>   
          
          <div class="animated bounceInDown" id="rightSquare">
            <div id="container">
            <h1 class="signup">Sign Up </h1>
            <form className="animated slideInLeft">    
            <ValidationError error={this.state.error}></ValidationError>                 
            <input class="optin" name="name"  onChange={this.handleChange} type="text" placeholder="Name" />
           <input class="optin" name="email" type="text"  onChange={this.handleChange} placeholder="Email" />   
           <input class="optin" name="empId" type="text"  onChange={this.handleChange} placeholder="Employee ID" />   
            <input class="optin" name="password" type="password"  onChange={this.handleChange} placeholder="Password" />  
            <input class="optin" name="confirmPassword" type="password"  onChange={this.handleChange} placeholder="Confirm Password" /> 
            </form>       
             <button class="animated infinite pulse button btn btn-info" onClick={this.register}>
           <span><i class="fa fa-user" aria-hidden="true"></i></span><span id="twitter">CREATE ACCOUNT</span>
         </button>
            <h3 id="footer">Already Member? <span id="terms" onClick={() => {window.location = "/"}}>Sign In</span></h3>
            </div>   
            
       </div> 
          
     
    </div>
      )
    }
  }
  
  export default Registration;