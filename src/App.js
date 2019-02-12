import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GroupsContainer from './GroupComponents/GroupsContainer.js'
import EventsContainer from './EventComponents/EventsContainer.js'

const usersURL = `http://localhost:3001/api/v1/users/`
const groupsURL = `http://localhost:3001/api/v1/groups/`
const userGroupsURL = `http://localhost:3001/api/v1/user_groups/`
const eventsURL = `http://localhost:3001/api/v1/events/`

// hello

class App extends Component {
  state = {
    userId: 1,
    data: null,
    allUsers: [],
    selectedGroupId: 0,
    selectedGroupEvents: [],
    selectedEventId: 0,
    editingEventId: 0,
    eventsContainerDisplay: "",
    newGroupName: "",
    newGroupUsers: [],
    newGroupId: null,
    newEvent: {
      name: "",
      category: "",
      description: ""
    },
    editedEvent: {
      id: 0,
      name: "",
      category: "",
      description: ""
    }
  } // end of state

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
  } // end of componentDidMount()

  handleNewGroupSubmit = (event) => {
    // console.log(this.state.newGroupUsers)
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
          // console.log("user: ", user)
          // console.log("newGroup.id: ", newGroup.id)
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
        })

        const data = this.state.data

        this.setState({
          eventsContainerDisplay: "",
          data: {...data, groups: [...this.state.data.groups, newGroup]}
        })

      }) //End of then
  } // end of handleNewGroupSubmit()

  // const findGroup = (array, groupId) => {
  //   return array.find( g => g.id === groupId )
  // }

  handleOnClickGroups = (event) => {
    const currentGroup = this.state.data.groups.find( group =>
      group.id === parseInt(event.target.id)
    )

    let newSelectedGroupId
    let newEventsContainerDisplay
    if (this.state.selectedGroupId === parseInt(event.target.id)) {
      newSelectedGroupId = 0
      newEventsContainerDisplay = ""
    } else {
      newSelectedGroupId = parseInt(event.target.id)
      newEventsContainerDisplay = "events"
    }

    this.setState({
      selectedGroupId: newSelectedGroupId,
      selectedGroupEvents: currentGroup.events,
      eventsContainerDisplay: newEventsContainerDisplay
    })
  } // end of handleOnClickGroups()

  handleOnClickEvents = (event) => {
    // console.log("handleOnClickEvents()", event.target.id)
    // this will set the state of selectedEventId to the id of the event that is clicked
    this.setState({
      selectedEventId: parseInt(event.target.id),
      editingEventId: 0
    })
    // if the event being clicked is currently the selectedEventId, switch selectedEventId to 0
  } // end of handleOnClickEvents()

  handleEventEditClick = (event) => {
    // console.log("event.target.category: ", event.target.dataset.category)
    let eventToEdit = {
      id: parseInt(event.target.id),
      name: event.target.name,
      category: event.target.dataset.category,
      description: event.target.dataset.description
    }

    this.setState({
      editingEventId: parseInt(event.target.id),
      editedEvent: eventToEdit
    })
  } // end of handleEventEditClick()


  handleEditEventChange = (event) => {
    let editedEvent = {...this.state.editedEvent}

    editedEvent[event.target.name] = event.target.value
    this.setState({editedEvent})
  }

  handleEventEditSubmit = (event) => {
    event.preventDefault()

    fetch(`${eventsURL}${this.state.editingEventId}`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.editedEvent.name,
        category: this.state.editedEvent.category,
        description: this.state.editedEvent.description,
      })
    })
    .then(res => res.json())
    .then(updatedEvent => {
      const updatedGroupEvents = this.state.selectedGroupEvents.map(event => {
        if (event.id === updatedEvent.id) {
          return updatedEvent
        } else {
          return event
        }
      })

      const updatedGroups = this.state.data.groups.map(group => {
        if (group.id === updatedEvent.group_id) {
          return {...group, events: updatedGroupEvents}
        } else {
          return group
        }
      })

      this.setState({
        eventsContainerDisplay: "events",
        editingEventId: 0,
        editedEvent: {
          id: 0,
          name: "",
          category: "",
          description: ""
        },
        data: {...this.state.data, groups: updatedGroups},
        selectedGroupEvents: updatedGroupEvents
      })

    })

  }

  handleEventDelete = (event) => {
    const updatedGroupEvents = this.state.selectedGroupEvents.filter(event => event.id !== this.state.selectedEventId)

    const updatedGroups = this.state.data.groups.map(group => {
      if (group.id === this.state.selectedGroupId) {
        return {...group, events: updatedGroupEvents}
      } else {
        return group
      }
    })

    fetch(`${eventsURL}${event.target.id}`, {
      method: "DELETE"
    })

    const data = this.state.data

    this.setState({
      data: {...data, groups: updatedGroups},
      selectedGroupEvents: updatedGroupEvents
    }, () => console.log(this.state.data) )
  } // end of handleEventDelete()

  handleAddGroup = () => {
    this.setState({eventsContainerDisplay: "new-group"})
  }

  handleNewGroupNameChange = (event) => {
    this.setState({newGroupName: event.target.value})
  }

  handleNewEventChange = (event) => {
    let newEvent = {...this.state.newEvent}

    newEvent[event.target.name] = event.target.value
    this.setState({newEvent})
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

  handleAddEventClick = () => {
    this.setState({eventsContainerDisplay: "new-event"})
  }

  handleNewEventSubmit = (event) => {
    // console.log(this.state.selectedGroupId)
    event.preventDefault()
    fetch(eventsURL, {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.newEvent.name,
        category: this.state.newEvent.category,
        description: this.state.newEvent.description,
        group_id: this.state.selectedGroupId
      })
    })
    .then(res => res.json())
    .then(newEvent => {
      const updatedGroups = this.state.data.groups.map(group => {
        if (group.id === newEvent.group_id) {
          return {...group, events: group.events.push(newEvent)}
        } else {
          return group
        }
      })

      const data = this.state.data

      this.setState({
        eventsContainerDisplay: "events",
        data: {...data, groups: updatedGroups}
      }) // end of this.setState

    }) // end of then
  } // end of handleNewEventSubmit()

  render() {
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
              handleAddEventClick={this.handleAddEventClick}
              newEvent={this.state.newEvent}
              handleNewEventChange={this.handleNewEventChange}
              handleNewEventSubmit={this.handleNewEventSubmit}
              handleOnClickEvents={this.handleOnClickEvents}
              selectedEventId={this.state.selectedEventId}
              handleEventDelete={this.handleEventDelete}
              handleEventEditClick={this.handleEventEditClick}
              handleEventEditSubmit={this.handleEventEditSubmit}
              editedEvent={this.state.editedEvent}
              editingEventId={this.state.editingEventId}
              handleEditEventChange={this.handleEditEventChange}
              /></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
