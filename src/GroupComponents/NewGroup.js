import React from 'react'

// const showAllUsers = (input) => {
//   return input.allUsers.map(user => {
//     return <option value={user.id}>{user.name}</option>
//   })
// }

const NewGroup = (props) => {

  return (
    <div>
      <form onSubmit={(event) => props.handleNewGroupSubmit(event)} id="newGroup">
        <input onChange={(event) => props.handleNewGroupNameChange(event)} type="text" name="groupName" placeholder="Group Name" value={props.newGroupName} /><br />
        <div class="input-field">
          <select multiple onChange={(event => props.handleUserSelect(event))}>
            {props.allUsers.map(user => {
              return <option value={user.id}>{user.name}</option>
            })}
          </select><br />
        </div>

        <input type="submit" value="Create Group" />
      </form>


    </div>
  )
}

export default NewGroup
