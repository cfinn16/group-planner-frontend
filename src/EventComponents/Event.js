import React from 'react'
import EditEvent from './EditEvent.js'
import {Button} from 'react-materialize'
import CommentsContainer from '../CommentComponents/CommentsContainer.js'


/****************** HELPER METHODS ************************************/

/* -------------------------------------------------------------------*/
const renderEvent = (props) => {

  if (props.editingEventId === props.data.id) {
    return (

      <EditEvent
        handleEventEditSubmit={props.handleEventEditSubmit}
        editedEvent={props.editedEvent}
        handleEditEventChange={props.handleEditEventChange} />

    ) // end of return

  } else if (props.selectedEventId === props.data.id) {
    return (

      <div>
        <p>Category: {props.data.category} </p>
        <p>Description: {props.data.description} </p>

        <Button
          className=""
          id={props.data.id}
          name={props.data.name}
          data-category={props.data.category}
          data-description={props.data.description}
          onClick={props.handleEventEditClick} >
          Edit
        </Button>

        <Button
          className=""
          id={props.data.id}
          onClick={props.handleEventDelete} >
          Delete
        </Button>

        <CommentsContainer
          commentsData={props.data.comments}
          allUsers={props.allUsers}
          newComment={props.newComment}
          handleNewCommentChange={props.handleNewCommentChange}
          handleNewCommentSubmit={props.handleNewCommentSubmit}
          selectedEventId={props.selectedEventId} />
      </div>

    ) // end of return
  } // end of if
} // end of renderEvent()
/* -------------------------------------------------------------------*/

/****************** END OF HELPER METHODS *****************************/


const Event = (props) => {



  return (

    <div className="card-panel teal card-text">
      <h4
        id={props.data.id}
        onClick={ (event) => props.handleOnClickEvents(event) } >
        {props.data.name}
      </h4>

      { renderEvent(props) }
    </div>

  ) // end of return
} // end of Event

export default Event
