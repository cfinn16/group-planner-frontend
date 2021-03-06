/******************************* IMPORTS ******************************/


import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GroupsContainer from './GroupComponents/GroupsContainer.js'
import EventsContainer from './EventComponents/EventsContainer.js'
import {Row, Navbar, NavItem} from 'react-materialize'


/*************************** END OF IMPORTS ***************************/


/************************ CONSTANTS ***********************************/


const usersURL = `http://localhost:3000/api/v1/users/`
const groupsURL = `http://localhost:3000/api/v1/groups/`
const userGroupsURL = `http://localhost:3000/api/v1/user_groups/`
const eventsURL = `http://localhost:3000/api/v1/events/`
const commentsURL = `http://localhost:3000/api/v1/comments/`


/************************ END OF CONSTANTS ****************************/

// start of App class
class App extends Component {

/**************************** STATE ***********************************/


  state = {
    userId: 0,
    data: null,
    allUsers: [],
    selectedGroupId: 0,
    selectedGroupEvents: [],
    selectedEventId: 0,
    editingEventId: 0,
    selectedEventsComments: [],
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
    },
    newComment: {
      userId: 0,
      eventId: 0,
      content: ""
    }
  } // end of state


/********************* END OF STATE ***********************************/


/**************************** INITIAL FETCH ***************************/


  componentDidMount() {
    console.log("Mounted")
    if (!this.props.successfulLogin) {
      this.props.history.push('/signup')
    } else {
      fetch(`${usersURL}${this.props.userId}`)
        .then(res => res.json())
        .then(data => {
          this.setState({
            data: data,
            userId: this.props.userId
          })
        })

      fetch(usersURL)
        .then(res => res.json())
        .then(allUsers => {
          this.setState({allUsers})
        })
    }
  } // end of componentDidMount()


/**************************** END OF INITIAL FETCH*********************/


/**************************** GROUP FUNCTIONS *************************/


/* -------------------------------------------------------------------*/
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

      this.setState({
        selectedGroupId: newSelectedGroupId,
        selectedGroupEvents: currentGroup.events,
        eventsContainerDisplay: newEventsContainerDisplay
      })
    }

  } // end of handleOnClickGroups()
/* -------------------------------------------------------------------*/


/* -------------------------------------------------------------------*/
  handleNewGroupSubmit = (event) => {
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
        }) // end of this.state.newGroupUsers.map

        const data = this.state.data

        this.setState({
          eventsContainerDisplay: "",
          data: {...data, groups: [...this.state.data.groups, newGroup]},
          newGroupName: "",
          newGroupUsers: []
        }) // end of this.setState
      }) // end of .then
  } // end of handleNewGroupSubmit()
/* -------------------------------------------------------------------*/


/* -------------------------------------------------------------------*/
  handleAddGroup = () => {
    this.setState({eventsContainerDisplay: "new-group"})
  } // end of handleAddGroup()
/* -------------------------------------------------------------------*/


/* -------------------------------------------------------------------*/
  handleNewGroupNameChange = (event) => {
    this.setState({newGroupName: event.target.value})
  } // end of handleNewGroupNameChange()
/* -------------------------------------------------------------------*/


/* -------------------------------------------------------------------*/
  handleUserSelect = (event) => {
    let options = event.target.options;
    let selectedUsers = []
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selectedUsers.push(parseInt(options[i].value, 10));
      }
    } // end of for

    this.setState({newGroupUsers: selectedUsers});
  } // end of handleUserSelect()
/* -------------------------------------------------------------------*/


/************************ END OF GROUP FUNCTIONS **********************/


/************************** EVENT FUNCTIONS ***************************/


/* -------------------------------------------------------------------*/
  handleOnClickEvents = (event) => {
    this.setState({
      selectedEventId: parseInt(event.target.id),
      editingEventId: 0,
      selectedEventsComments: this.state.data.comments
    })

    console.log("handleOnClickEvents: ", this.state.data)

  } // end of handleOnClickEvents()
/* -------------------------------------------------------------------*/


/* -------------------------------------------------------------------*/
  handleEventEditClick = (event) => {
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
/* -------------------------------------------------------------------*/


/* -------------------------------------------------------------------*/
  handleEditEventChange = (event) => {
    let editedEvent = {...this.state.editedEvent}

    editedEvent[event.target.name] = event.target.value
    this.setState({editedEvent})
  } // end of handleEditEventChange()
/* -------------------------------------------------------------------*/


/* -------------------------------------------------------------------*/
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
      }) // end of this.setState
    }) // end of .then(updatedEvent => ... )
  } // end of handleEventEditSubmit()
/* -------------------------------------------------------------------*/


/* -------------------------------------------------------------------*/
  handleEventDelete = (event) => {
    const updatedGroupEvents = this.state.selectedGroupEvents.filter(event => event.id !== this.state.selectedEventId)

    const updatedGroups = this.state.data.groups.map(group => {
      if (group.id === this.state.selectedGroupId) {
        return {...group, events: updatedGroupEvents}
      } else {
        return group
      }
    }) // end of updatedGroups

    fetch(`${eventsURL}${event.target.id}`, {
      method: "DELETE"
    })

    const data = this.state.data

    this.setState({
      data: {...data, groups: updatedGroups},
      selectedGroupEvents: updatedGroupEvents
    }, () => console.log(this.state.data) )
  } // end of handleEventDelete()
/* -------------------------------------------------------------------*/


/* -------------------------------------------------------------------*/
  handleNewEventChange = (event) => {
    let newEvent = {...this.state.newEvent}

    newEvent[event.target.name] = event.target.value
    this.setState({newEvent})
  } // end of handleNewEventChange()
/* -------------------------------------------------------------------*/


/* -------------------------------------------------------------------*/
  handleAddEventClick = () => {
    this.setState({eventsContainerDisplay: "new-event"})
  } // handleAddEventClick()
/* -------------------------------------------------------------------*/


/* -------------------------------------------------------------------*/
  handleNewEventSubmit = (event) => {
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
          return {...group, events: group.events.concat(newEvent)}
        } else {
          return group
        }
      }) // end of updatedGroups

      const data = this.state.data

      this.setState({
        eventsContainerDisplay: "events",
        data: {...data, groups: updatedGroups},
        selectedGroupEvents: [...this.state.selectedGroupEvents, newEvent],
        newEvent: {}
      }) // end of this.setState
    }) // end of .then(newEvent => ... )
  } // end of handleNewEventSubmit()
/* -------------------------------------------------------------------*/


/*********************** END OF EVENT FUNCTIONS ***********************/


/*********************** COMMENT FUNCTIONS ****************************/

/* -------------------------------------------------------------------*/
handleNewCommentChange = (event) => {
  this.setState({
    newComment: {
      userId: this.props.userId,
      eventId: this.state.selectedEventId,
      content: event.target.value
    } // end of this.setState
  }) // end of this.setState
} // end of handleCommentChange()
/* -------------------------------------------------------------------*/


/* -------------------------------------------------------------------*/
handleNewCommentSubmit = (event) => {
  event.preventDefault()

  fetch(commentsURL, {
    method: "post",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: this.state.userId,
      event_id: this.state.newComment.eventId,
      content: this.state.newComment.content
    })
  })
  .then( res => res.json())
  .then( newComment => {

    const updatedGroupEvents = this.state.selectedGroupEvents.map( event => {
      if (event.id === this.state.selectedEventId) {
        return {...event, comments: [...event.comments, newComment] }
      } else {
        return event
      }
    }) // end of updatedGroupEvents

    const updatedGroups = this.state.data.groups.map(group => {
      if (group.id === this.state.selectedGroupId) {
        return {...group, events: updatedGroupEvents}
      } else {
        return group
      }
    }) // end of updatedGroups

    this.setState({
      newComment: {
        userId: 0,
        eventId: 0,
        content: ""
      },
      data: {...this.state.data, groups: updatedGroups},
      selectedGroupEvents: updatedGroupEvents

    }) // end of this.setState
  }) // end of .then
} // end of handleNewEventSubmit()
/* -------------------------------------------------------------------*/

/*********************** END OF COMMENT FUNCTIONS *********************/

/*********************** MISC FUNCTIONS *******************************/

//nothing in here

/*********************** END OF MISC FUNCTIONS ************************/


/******************************* RENDER *******************************/

  render() {
    return (
      <div className="App">

        <Navbar brand='WePlan' right></Navbar>

        <Row>
          <div className="col s3">
            <GroupsContainer
              data={this.state.data}
              handleOnClickGroups={this.handleOnClickGroups}
              selectedGroupId={this.state.selectedGroupId}
              handleAddGroup={this.handleAddGroup} />
          </div>

          <div className="col s9">
            <EventsContainer
              data={this.state.selectedGroupEvents}
              display={this.state.eventsContainerDisplay}
              handleNewGroupSubmit={this.handleNewGroupSubmit}
              newGroupName={this.state.newGroupName}
              handleNewGroupNameChange={this.handleNewGroupNameChange}
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
              newComment={this.state.newComment}
              handleNewCommentChange={this.handleNewCommentChange}
              handleNewCommentSubmit={this.handleNewCommentSubmit} />
          </div>
        </Row>
      </div>
    );
  } // end of render()

/*************************** END OF RENDER ****************************/

} // end of App

export default App;
