import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import SignUpForm from './SignUpComponenets/SignUpForm.js';
import { Route, Switch, Link, Redirect, BrowserRouter as Router } from 'react-router-dom';

export default class Nav extends React.Component {
  state={
    userId: 0,
    users: [],
    logInName: "",
    logInEmail: "",
    successfulLogin: false,
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/users/')
     .then(res => res.json())
     .then(users => {
       this.setState({users})
     })
  }

  handleLogInSubmit = (e) => {
    e.preventDefault()
    const currentUser = this.state.users.find(user => user.name === this.state.logInName && user.email === this.state.logInEmail)
    if (this.state.users.includes(currentUser)) {
        this.setState({
          userId: currentUser.id,
          successfulLogin: true
        })
    } else {
      console.log("Sorry dude")
    }
  }

  handleLogInInput = (e) => {
    this.setState({[e.target.name]: e.target.value}, () => console.log(this.state))
  }



  render(){
    return (
    <Router>
      <div>
        <Switch>
          <Route
          path="/signup"
          render={(props) => (
            <SignUpForm {...props}
            handleLogInSubmit={this.handleLogInSubmit}
            handleLogInInput={this.handleLogInInput}
            logInName={this.state.logInName}
            logInEmail={this.state.logInEmail}
            />
          )}/>
          <Route exact path="/"
            render={(props) => (
            <App {...props} userId={this.state.userId}/>
            )}/>
        </Switch>
        {this.state.successfulLogin && <Redirect to="/" push />}
      </div>
    </Router>
    )
  }

}
