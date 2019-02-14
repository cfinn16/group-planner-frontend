import React from 'react'
import Comment from './Comment.js'
import {Button} from 'react-materialize'





/****************** HELPER METHODS ************************************/

/* -------------------------------------------------------------------*/
const renderComments = (input) => {
  console.log("input in commentsContainer: ", input.commentsData)

  if (input.commentsData.length > 0) {
    return input.commentsData.map( comment => {
      return (
        <Comment
        key={comment.id}
        userId={comment.user_id}
        data={comment}
        allUsers={input.allUsers} />
      )
    })
  }
} // end of renderComments()
/* -------------------------------------------------------------------*/

/****************** END OF HELPER METHODS *****************************/

const CommentsContainer = (props) => {
  return (

    <div>
    <br />

      <h5>Comments</h5>

      {renderComments(props)}
      <input
        onChange={(event) => props.handleNewCommentChange(event)} />
        
      <Button
       type="submit"
       onClick={(event) => props.handleNewCommentSubmit(event)} >
        Post Comment
      </Button>
    </div>

  ) // end of return
} // end of EventsContainer

export default CommentsContainer
