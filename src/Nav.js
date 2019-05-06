
import React from 'react';
import App from './App.js';
import SignUpForm from './SignUpComponenets/SignUpForm.js';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';

export default class Nav extends React.Component {
  state = {
    userId: 0,
    users: [],
    logInName: "",
    logInEmail: "",
    successfulLogin: false,
  } // end of state()

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/users/')
     .then(res => res.json())
     .then(users => {
       this.setState({users})
     })
  } // end of componentDidMount()

  handleLogInSubmit = (e) => {
    e.preventDefault()
    const currentUser = this.state.users.find(user => user.name === this.state.logInName && user.email === this.state.logInEmail)
    if (this.state.users.includes(currentUser)) {
        this.setState({
          userId: currentUser.id,
          successfulLogin: true
        })
    } else {
      console.log("User Not Found")
    }
  } // end of handleLogInSubmit()

  handleLogInInput = (e) => {
    this.setState({[e.target.name]: e.target.value}, () => console.log(this.state))
  } // end of handleLogInInput()

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
            logInEmail={this.state.logInEmail} />
          )}/>
          <Route exact path="/"
            render={(props) => (
            <App {...props} userId={this.state.userId} successfulLogin={this.state.successfulLogin}/>
            )}/>
        </Switch>
        {this.state.successfulLogin && <Redirect to="/" push />}
      </div>
    </Router>
    )
  } // end of render()
}
