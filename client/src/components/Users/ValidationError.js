import React, {Component} from 'react';

class ValidationError extends Component {

    constructor(props){
        super(props);
         
    }

    render() {
      let { error } = this.props;
  
      return(
        <React.Fragment>
         {
             error ? <div className="alert alert-danger error">{error}</div> : null
         }
         </React.Fragment>
      )
    }
  }
  
  export default ValidationError;