import React, {Component} from 'react';

class Message extends Component {

    constructor(props){
        super(props);
         
    }

    render() {
      let { message } = this.props;
  
      return(
        <React.Fragment>
         {
             message ? <div className="alert alert-success message">{message}</div> : null
         }
         </React.Fragment>
      )
    }
  }
  
  export default Message;