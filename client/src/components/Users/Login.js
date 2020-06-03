import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component {

    state = {
      user: {}
    }
  
    componentDidMount(){
     // this.getTodos();
    }
  
   
  
    handleChange = (e) => {
        const user = this.state.user;
        user[e.target.name] = e.target.value;
        this.setState({
          user: user
        })
      }

      login = () => {
        const user = this.state.user;
        const data = {
            email: user.email, 
            password: user.password
        }
   console.log(data)
        if(data.email  && data.password ){
          axios.post('/api/users/login', data)
            .then(res => {
              if(res.data){ console.log(res)
                console.log('Signed In successfully');
             
              this.props.history.push({
                pathname:"/home",
                state:res.data
               });
              }
              else{
                  console.log('Invalid UserName/Password')
              }
            })
            .catch(err => console.log(err))
        }else {
          console.log('input field requiredp')
        }
      }

    render() {
      let { user } = this.state;
  
      return(

        <div class="animated slideInLeft" style={{height:'450px'}} id="square">    
        <div class="animated bounceInUp" id="leftSquare">
          <div class="animated bounceInUp" id="circle">
          <img class="brand img-responsive" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/827672/branding.png" />
          
          </div>
                  
  <h2 id="title">Welcome to Divider</h2>
          <h3 id="subtitle">You are moments away from your first adventure.</h3>
        
       </div>   
          
          <div class="animated bounceInDown" id="rightSquare">
            <div id="container">
            <h1 class="signup">Sign In </h1>
            <form className="animated slideInLeft">               
           <input class="optin" name="email" type="text"  onChange={this.handleChange} placeholder="Email" />      
            <input class="optin" name="password" type="password"  onChange={this.handleChange} placeholder="Password" /> </form>  
             <button class="animated infinite pulse button btn btn-info" onClick={this.login}>
           <span><i class="fa fa-user" aria-hidden="true"></i></span><span id="twitter">LOGIN</span>
         </button>
            <h3 id="footer">New User? <span id="terms" onClick={() => {window.location = "/register"}}>Create Account</span></h3>
            </div>   
            
       </div> 
          
     
    </div>
            
   )
    }
  }
  
  export default Login;