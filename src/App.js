import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GroupsContainer from './GroupComponents/GroupsContainer.js'
import EventsContainer from './EventComponents/EventsContainer.js'

const usersURL = `http://localhost:3001/api/v1/users/`

class App extends Component {
  state = {
    userId: 1,
    data: null,
    selectedGroupId: 1,
    selectedGroupEvents: []
  }

  componentDidMount() {
    // fetch(`http://localhost:3001/api/v1/users/${this.state.userId}`)
    fetch(`${usersURL}${this.state.userId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({data})
      })
  }

  // const findGroup = (array, groupId) => {
  //   return array.find( g => g.id === groupId )
  // }

  handleOnClickGroups = (event) => {
    console.log("in handleOnClickGroups()", event.target.id )
    // this.setState({
    //   selectedGroupId: event.target.id
    // })

    // console.log( this.state.data.groups.find (group => group.id === 1))
    // console.log(  this.state.data.groups.find( group => group.id === parseInt(event.target.id) ))
    const currentGroup = this.state.data.groups.find( group =>
      group.id === parseInt(event.target.id)
    )

    this.setState({
      selectedGroupEvents: currentGroup.events
    })
  }

  render() {
    console.log("in render(): ", this.state.selectedGroupEvents)
    // console.log("selectedGroupEvents: ", this.state.selectedGroupEvents)
    return (
      <div className="App">
        <GroupsContainer data={this.state.data} handleOnClickGroups={this.handleOnClickGroups} />
        <EventsContainer data={this.state.selectedGroupEvents} />
      </div>
    );
  }
}

export default App;
