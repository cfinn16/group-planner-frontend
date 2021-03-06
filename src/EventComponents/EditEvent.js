import React from 'react'
import {Button} from 'react-materialize'

const EditEvent = (props) => {
  return (

    <form onSubmit={ (event) => {props.handleEventEditSubmit(event)} } >

      <input
        onChange={ (event) => props.handleEditEventChange(event) }
        type="text"
        name="name"
        value={props.editedEvent.name} />
      <br />

      <input
        onChange={ (event) => props.handleEditEventChange(event) }
        type="text"
        name="category"
        value={props.editedEvent.category} />
      <br />

      <input
        onChange={ (event) => props.handleEditEventChange(event) }
        type="text"
        name="description"
        value={props.editedEvent.description} />
      <br />

      <Button className="" type="submit">Edit Event</Button>

    </form>

  ) // end of return
} // end of EditEvent

export default EditEvent
