import React from 'react'
import {Button} from 'react-materialize'

const EventsHeader = (props) => {
  return (

    <div>
      <br />
      <h4 className="header-text">Events </h4>

      <Button
        floating
        icon="add"
        onClick={props.handleAddEventClick} />
    </div>

  ) // end of return
} // end of EventsHeader

export default EventsHeader
