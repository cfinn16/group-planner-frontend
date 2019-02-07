import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const usersURL = `http://localhost:3001/api/v1/users/`

class App extends Component {
  state = {
    userId: 1,
    data: []
  }


  componentDidMount() {
    // fetch(`http://localhost:3001/api/v1/users/${this.state.userId}`)
    fetch(`${usersURL}${this.state.userId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({data})
      })
  }

  render() {
    console.log(this.state.data)
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
