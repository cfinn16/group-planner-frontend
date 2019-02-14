import React from 'react'

const findUser = (input) => {
  return (input.allUsers.find( user => user.id === input.userId))
}

const Comment = (props) => {
  console.log(props.data)
  return (

    <div>
      <h6>{findUser(props).name}: {props.data.content}</h6>
    </div>

  ) // end of return
} // end of EventsContainer

export default Comment
