import React from 'react'
import Event from './Event.js'
import EventsHeader from './EventsHeader.js'
import NewEvent from './NewEvent.js'
import NewGroup from '../GroupComponents/NewGroup.js'

let selectedGroup = null

const renderEvents = (input) => {
  console.log("In renderEvents: ", input.data.length)
  // return <EventsHeader handleAddEventClick={input.handleAddEventClick}/>
  if (input.data.length > 0) {
    return input.data.map( event => {
      return (
        <Event key={event.id} data={event}/>
      )
    })
  }
} // end of renderEvents()

// change the display based on what the state is
const changeDisplayFromState = (input) => {
    console.log("In changeDisplayFromState", input.display)
    if (input.display === "events") {
      // return <EventsHeader handleAddEventClick={input.handleAddEventClick}/>
      // if (input.data.length > 0) {
      return (
        <div>
          <EventsHeader handleAddEventClick={input.handleAddEventClick}/>
          {renderEvents(input)}
        </div>
      )

    } else if (input.display === "new-event") {
      return <NewEvent
      newEvent={input.newEvent}
      handleNewEventChange={input.handleNewEventChange}
      handleNewEventSubmit={input.handleNewEventSubmit}
      />
    }
    else if (input.display === "new-group") {
      return <NewGroup
      newGroupName={input.newGroupName} handleNewGroupSubmit={input.handleNewGroupSubmit} handleNewGroupNameChange={input.handleNewGroupNameChange}
      allUsers={input.allUsers}
      handleUserSelect={input.handleUserSelect}
      />
    } else if (input.display === "edit-group") {
      return <h1>"edit group"</h1>
    }
}

const EventsContainer = (props) => {
  console.log("props.data in EventsContainer: ", props.data)



  return (

    // props.data ? <h2>{console.log("props.data.groups.events in EventsContainer: ", props.data.groups[0].events )}</h2> : <h1>No data in EventsContainer</h1>
    //
    // (props.data.length > 0) ? <h2>{console.log("props in EventsContainer: ", props)}</h2> : <h1>No data in EventsContainer</h1>
    // props.data.length > 0 ?
    //
    // {if (props.display === "events") {
    //     renderEvents(props.data)
    //
    // }}
    // : <h1>No data in EventsContainer</h1>

    // (props.data.length > 0)
    <div>
    {changeDisplayFromState(props)}
    </div>
    // : <h1>No data</h1>

  ) // end of return
}

export default EventsContainer
