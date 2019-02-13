import React from 'react'
import {Button} from 'react-materialize'

const NewEvent = (props) => {

  return (

    <div>
      <h4>New Event</h4>

      <form onSubmit={ (event) => {props.handleNewEventSubmit(event)} } >

        <input
          onChange={ (event) => props.handleNewEventChange(event) }
          type="text"
          name="name"
          placeholder="Event Name"
          value={props.newEvent.name} />
        <br />

        <input
          onChange={ (event) => props.handleNewEventChange(event) }
          type="text"
          name="category"
          placeholder="Category"
          value={props.newEvent.category} />
        <br />

        <input
          onChange={ (event) => props.handleNewEventChange(event) }
          type="text"
          name="description"
          placeholder="Description"
          value={props.newEvent.description} />
        <br />

        <Button type="submit">Create Event</Button>

      </form>
    </div>

  ) // end of return
} // end of NewEvent

export default NewEvent
