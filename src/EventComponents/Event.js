import React from 'react'
import EditEvent from './EditEvent.js'



const renderEvent = (props) => {

  if (props.editingEventId === props.data.id) {
    return (
      <>
      <EditEvent handleEventEditSubmit={props.handleEventEditSubmit}
      editedEvent={props.editedEvent}
      handleEditEventChange={props.handleEditEventChange}/>
      </>
    )
  } else if (props.selectedEventId === props.data.id) {
    console.log("things: ", props.data.category, props.data.description)
    return (
      <>
        <p>Category: {props.data.category}</p>
        <p>Description: {props.data.description} </p>
        <button
        id={props.data.id}
        name={props.data.name}
        data-category={props.data.category}
        data-description={props.data.description}
        onClick={props.handleEventEditClick}>
        Edit
        </button>

        <button
        id={props.data.id}
        onClick={props.handleEventDelete}>
        Delete
        </button>
      </>
  )}
}


const Event = (props) => {
  // console.log(props.data.id)
  // console.log(props.selectedEventId)
  return (
    <div className="single-event">
      <h1 id={props.data.id}
          onClick={(event) => props.handleOnClickEvents(event)}>
        {props.data.name}
      </h1>

      {renderEvent(props)}


    </div>
  )
}

export default Event

// props.selectedEventId === props.data.id &&
// <>
//   <p>Category: {props.data.category}</p>
//   <p>Description: {props.data.description} </p>
//   <button id={props.data.id}
//   onClick={props.handleEventEditClick}>Edit</button>
//   <button id={props.data.id} name={props.data.name} category={props.data.category} description={props.data.description} onClick={props.handleEventDelete}>Delete</button>
// </>




// {
  //   props.editingEventId === props.data.id &&
  //   <>
  //     <EditEvent         handleEventEditSubmit={props.handleEventEditSubmit}
  //     editEvent={props.editEvent}
  //     />
  //   </>
  // }
