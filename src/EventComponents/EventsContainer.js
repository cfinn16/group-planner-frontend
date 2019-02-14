import React from 'react'
import Event from './Event.js'
import EventsHeader from './EventsHeader.js'
import NewEvent from './NewEvent.js'
import NewGroup from '../GroupComponents/NewGroup.js'


// is this used??
// let selectedGroup = null


/****************** HELPER METHODS ************************************/

/* -------------------------------------------------------------------*/
const renderEvents = (input) => {

  if (input.data.length > 0) {
    return input.data.map( event => {
      return (

        <Event
          key={event.id}
          data={event}
          handleOnClickEvents={input.handleOnClickEvents}
          selectedEventId={input.selectedEventId}
          handleEventDelete={input.handleEventDelete}
          handleEventEditClick={input.handleEventEditClick}
          handleEventEditSubmit={input.handleEventEditSubmit}
          editedEvent={input.editedEvent}
          editingEventId={input.editingEventId}
          handleEditEventChange={input.handleEditEventChange}
          allUsers={input.allUsers}
          newComment={input.newComment}
          handleNewCommentChange={input.handleNewCommentChange}
          handleNewCommentSubmit={input.handleNewCommentSubmit}  />

      ) // end of return
    }) // end of input.data.map
  } // end of if
} // end of renderEvents()
/* -------------------------------------------------------------------*/

/* -------------------------------------------------------------------*/
const changeDisplayFromState = (input) => {

    if (input.display === "events") {
      return (
        <div>
          <EventsHeader
            handleAddEventClick={input.handleAddEventClick} />

          { renderEvents(input) }
        </div>
      ) // end of return

    } else if (input.display === "new-event") {
        return <NewEvent
          newEvent={input.newEvent}
          handleNewEventChange={input.handleNewEventChange}
          handleNewEventSubmit={input.handleNewEventSubmit} />

    } else if (input.display === "new-group") {
        return <NewGroup
          newGroupName={input.newGroupName}
          handleNewGroupSubmit={input.handleNewGroupSubmit}
          handleNewGroupNameChange={input.handleNewGroupNameChange}
          allUsers={input.allUsers}
          handleUserSelect={input.handleUserSelect} />

    } else if (input.display === "edit-group") {
        return <h1>"edit group"</h1>

    } // end of if
} // end of changeDisplayFromState()
/* -------------------------------------------------------------------*/

/****************** END OF HELPER METHODS *****************************/

const EventsContainer = (props) => {
  return (

    <div>
      { changeDisplayFromState(props) }
    </div>

  ) // end of return
} // end of EventsContainer

export default EventsContainer
