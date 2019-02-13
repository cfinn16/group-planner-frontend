import React from 'react'
import {Button} from 'react-materialize'

const EventsHeader = (props) => {
  return (

    <div>
      <h4>Events</h4>

      <Button
        icon="add"
        onClick={props.handleAddEventClick} />
    </div>

  ) // end of return
} // end of EventsHeader

export default EventsHeader
