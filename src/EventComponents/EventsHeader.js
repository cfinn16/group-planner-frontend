import React from 'react'

const EventsHeader = (props) => {
  return (
    <div className="events-header">
      <button onClick={props.handleAddEventClick}>Add Event</button>


    </div>
  )
}

export default EventsHeader
