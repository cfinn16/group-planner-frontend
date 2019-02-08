import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GroupsContainer from './GroupComponents/GroupsContainer.js'
import EventsContainer from './EventComponents/EventsContainer.js'

const usersURL = `http://localhost:3001/api/v1/users/`
const postURL = `http://localhost:3001/api/v1/groups/`

class App extends Component {
  state = {
    userId: 1,
    data: null,
    selectedGroupId: 1,
    selectedGroupEvents: [],
    selectedEvent: [],
    eventsContainerDisplay: "new-group",
    newGroupName: ""
  }

  componentDidMount() {
    // fetch(`http://localhost:3001/api/v1/users/${this.state.userId}`)
    fetch(`${usersURL}${this.state.userId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({data})
      })
  }

  handleNewGroupSubmit = (event) => {
    event.preventDefault()
    console.log(event)
    // fetch(`${postURL}`,
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json"
    //   },
    //   body: JSON.stringify({
    //     name: event.groupName
    //   })
    // )
    //   .then( response => response.json() )
    //   .then()
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

  handleAddGroup = () => {

  }

  render() {
    console.log("in render(): ", this.state.selectedGroupEvents)
    // console.log("selectedGroupEvents: ", this.state.selectedGroupEvents)
    return (
      <div className="App">
        <table>
          <tbody>
            <tr>
              <th>Groups<button onClick={this.handleAddGroup}>+</button></th>
              <th><h1>Events</h1></th>
            </tr>
            <tr>
              <td><GroupsContainer data={this.state.data} handleOnClickGroups={this.handleOnClickGroups} /></td>
              <td><EventsContainer data={this.state.selectedGroupEvents} display={this.state.eventsContainerDisplay}
              handleNewGroupSubmit={this.handleNewGroupSubmit} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
