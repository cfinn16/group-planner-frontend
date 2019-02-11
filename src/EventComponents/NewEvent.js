import React from 'react'

const NewEvent = (props) => {
  console.log(props.newEvent)
  return (
      // <form onSubmit={(event) => props.handleNewGroupSubmit(event)} id="newGroup">
      //   <input onChange={(event) => props.handleNewGroupNameChange(event)} type="text" name="groupName" placeholder="Group Name" value={props.newGroupName} /><br />
      //   <select multiple onChange={(event => props.handleUserSelect(event))}>
      //     {props.allUsers.map(user => {
      //       return <option value={user.id}>{user.name}</option>
      //     })}
      //   </select><br />
      //
      //   <input type="submit" value="Create Group" />
      // </form>

      <form onSubmit={(event) => {props.handleNewEventSubmit(event)}}>
        <input onChange={(event) => props.handleNewEventChange(event)}type="text" name="name" placeholder="Event Name" value={props.newEvent.name}/><br />
        <input onChange={(event) => props.handleNewEventChange(event)} type="text" name="category" placeholder="Category" value={props.newEvent.category}/><br />
        <input onChange={(event) => props.handleNewEventChange(event)} type="text" name="description" placeholder="Description" value={props.newEvent.description}/><br />

        <input type="submit" value="Create Event" />
      </form>

  )
}

export default NewEvent
