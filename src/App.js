import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GroupsContainer from './GroupComponents/GroupsContainer.js'
import EventsContainer from './EventComponents/EventsContainer.js'

const usersURL = `http://localhost:3001/api/v1/users/`
const groupsURL = `http://localhost:3001/api/v1/groups/`
const userGroupsURL = `http://localhost:3001/api/v1/user_groups/`

class App extends Component {
  state = {
    userId: 1,
    data: null,
    allUsers: [],
    selectedGroupId: 0,
    selectedGroupEvents: [],
    selectedEvent: [],
    eventsContainerDisplay: "events",
    newGroupName: "",
    newGroupUsers: [],
    newGroupId: null
  }

  componentDidMount() {
    // fetch(`http://localhost:3001/api/v1/users/${this.state.userId}`)
    fetch(`${usersURL}${this.state.userId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({data})
      })

    fetch(usersURL)
      .then(res => res.json())
      .then(allUsers => {
        this.setState({allUsers})
      })
  }

  handleNewGroupSubmit = (event) => {
    console.log(this.state.newGroupUsers)
    let newGroupObject = {}
    event.preventDefault()
    fetch(groupsURL, {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.newGroupName,
      })
    })
    .then(res => res.json())
    .then(newGroup => {

      this.state.newGroupUsers.map(user => {
          console.log("user: ", user)
          console.log("newGroup.id: ", newGroup.id)
          fetch(userGroupsURL, {
            method: "post",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              user_id: user,
              group_id: newGroup.id
            })
          })
      // console.log(newGroup)
      // this.setState({newGroupId: newGroup.id})
      // console.log(this.state.newGroupId)
        })
      })
     // end of then(newGroup => ... )

    // this.state.newGroupUsers.map(user => {
    //     fetch(userGroupsURL, {
    //       method: "post",
    //       headers: {
    //         "Accept": "application/json",
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify({
    //         user_id: user.id,
    //         group_id: this.state.newGroupId
    //       })
    //     })
    //   })

  }

  // const findGroup = (array, groupId) => {
  //   return array.find( g => g.id === groupId )
  // }

  handleOnClickGroups = (event) => {
    console.log("in handleOnClickGroups()", event.target.id )
    // console.log( this.state.data.groups.find (group => group.id === 1))
    // console.log(  this.state.data.groups.find( group => group.id === parseInt(event.target.id) ))
    const currentGroup = this.state.data.groups.find( group =>
      group.id === parseInt(event.target.id)
    )


    this.setState({
      selectedGroupId: parseInt(event.target.id),
      selectedGroupEvents: currentGroup.events
    })
  }

  handleAddGroup = () => {
    this.setState({eventsContainerDisplay: "new-group"})
  }

  handleNewGroupNameChange = (event) => {
    this.setState({newGroupName: event.target.value})
  }

  handleUserSelect = (event) => {
    let options = event.target.options;
    let selectedUsers = []
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selectedUsers.push(parseInt(options[i].value, 10));
      }
    }
    this.setState({newGroupUsers: selectedUsers});
  }

  render() {
    console.log("in render(): ", this.state.allUsers)
    // console.log("selectedGroupEvents: ", this.state.selectedGroupEvents)
    return (
      <div className="App">
        <table>
          <tbody>
            <tr>
              <th>My Groups<button onClick={this.handleAddGroup}>+</button></th>
              <th><h1>Events</h1></th>
            </tr>
            <tr>
              <td><GroupsContainer data={this.state.data} handleOnClickGroups={this.handleOnClickGroups}
              selectedGroupId={this.state.selectedGroupId}
              /></td>

              <td><EventsContainer
              data={this.state.selectedGroupEvents} display={this.state.eventsContainerDisplay}
              handleNewGroupSubmit={this.handleNewGroupSubmit} newGroupName={this.state.newGroupName} handleNewGroupNameChange={this.handleNewGroupNameChange}
              allUsers={this.state.allUsers}
              handleUserSelect={this.handleUserSelect}
              /></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
