import React, {Component} from 'react';
import axios from 'axios';

class Occupancy extends Component {

    state = {
      totalSeats: 0
    }
  
    componentDidMount(){
        this.getTotalSeats();
    }
  
    getTotalSeats = () => {
        axios.get('/api/occupancy/totalseats')
          .then(res => {
            if(res.data){
              this.setState({
                totalSeats: res.data[0].totalSeats
              })
            }
          })
          .catch(err => console.log(err))
      }
  
    handleChange = (e) => {
        this.setState({
          totalSeats: e.target.value
        })
      }

      addorupdate = () => {
        const data = {totalSeats: this.state.totalSeats
        }
        console.log(data)
        if(this.state.totalSeats){
          axios.post('/api/occupancy/addorupdate', data)
            .then(res => {
              if(res.data){console.log(res.data)
                console.log('Saved');
              //  window.location = "/";
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
        <div>
          <h1>Total Seats Available: </h1>
          <input name="totalSeats" type="number" onChange={this.handleChange} value={this.state.totalSeats}/>
        <button onClick={this.addorupdate}>Save</button>
        </div>
      )
    }
  }
  
  export default Occupancy;