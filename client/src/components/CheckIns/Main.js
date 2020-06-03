import React, {Component} from 'react';
import axios from 'axios';
import swal from 'sweetalert';

class Main extends Component {
constructor(props){
  super(props);
    this.state = {
      checkInStatus: 0,
      tokenStatus: '',
      user: this.props.user
    }
  }
  
    componentDidMount(){
      this.getStatus();
    }
  
    getStatus = () => {
      const user = this.state.user;
      const data = {
          empId: user.empId
      }
      axios.post('/api/checkIns/getstatus', data)
      .then(res => {
        if(res.data){ 
       this.setState({
        tokenStatus: res.data.tokenStatus,
        checkInStatus: res.data.checkInStatus
       })
      }
        else{
            console.log('Invalid')
        }
      })
      .catch(err => console.log(err))
  }
    

    swipeIn = () => {
      const user = this.state.user;
      const data = {
          empId: user.empId,
          checkInStatus: !this.state.checkInStatus,
          tokenStatus: this.state.checkInStatus ? 'Cancelled' : 'CheckedIn'
      }
 console.log(data)
      if(data.empId ){
        axios.post('/api/tokens/swipein', data)
          .then(res => {
            if(res.data){ console.log(res.data)
              this.setState({
               tokenStatus: res.data.tokenStatus,
               checkInStatus: res.data.checkInStatus
              })
             }
          else{
                console.log('Invalid')
            }
          })
          .catch(err => console.log(err))
      }else {
        console.log('input field requiredp')
      }
    }
   

      requestToken = () => {
        const user = this.state.user;
        const data = {
            empId: user.empId
        }
   console.log(data)
        if(data.empId ){
          axios.post('/api/tokens/requesttoken', data)
            .then(res => {console.log(res)
              if(res.data){ 
                if(res.data.status == true){
             this.setState({
              tokenStatus: res.data.result.tokenStatus
             })
            }
            else{
              swal({
                title: "Add to Queue?",
                text: "Do you want to add to Queue?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then(queue => {
                if (queue) {
                  axios.post('/api/tokens/addorupdate',{empId: data.empId,tokenStatus: 'InQueue'})
                  .then((r) => {
                    this.setState({
                      tokenStatus: r.data.tokenStatus
                     });
                     swal("Added to Queue!", "Successfully added to queue!", "success");
                  } 
                 
                  );
                 
                  
                }
                else{
                  axios.post('/api/tokens/addorupdate',{empId: data.empId,tokenStatus: 'Cancelled'})
                  .then((r) => {
                    this.setState({
                      tokenStatus: r.data.tokenStatus
                     });
                     swal("Try Again", "Try Again Later", "warning");
                  } 
                 
                  );
                }
              });
            }
              }
              else{
                  console.log('Invalid')
              }
            })
            .catch(err => console.log(err))
        }else {
          console.log('input field requiredp')
        }
      }

    render() {
      let { user } = this.state;
      const  checkInStatus = this.state.checkInStatus == 1 ? 'Swipe Out' : 'Swipe In';
      const  tokenStatus = !this.state.tokenStatus || this.state.tokenStatus == 'Cancelled' || this.state.tokenStatus == 'CheckedIn' ? 'Request Token': 
      (this.state.tokenStatus == 'InQueue' ? 'Added to Queue' : this.state.tokenStatus);
      const checkInEnabled = (this.state.checkInStatus == 0 && this.state.tokenStatus == 'Accepted')
      ||  (this.state.checkInStatus == 1 && this.state.tokenStatus == 'CheckedIn');
      const tokenDisabled = (this.state.tokenStatus == 'InQueue' ||this.state.tokenStatus == 'Accepted' || this.state.tokenStatus == 'CheckedIn')
      return(
        <div className="container" id="emp">
        <div id="booking-form" className="booking-form">
        <div className="form-group">
        <div className="form-submit">
        <input type="submit" id="submit" className="submit" onClick={this.swipeIn} disabled={!checkInEnabled} value={checkInStatus} />
        </div>
        <div className="form-submit">
        <input type="submit" id="submit" className="submit" onClick={this.requestToken} disabled={tokenDisabled} value={tokenStatus} />
        
        </div>
        </div>
        </div>
        </div>
      )
    }
  }
  
  export default Main;