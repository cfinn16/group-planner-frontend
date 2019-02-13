import React from 'react'
import {Input, Row} from 'react-materialize'

// const showAllUsers = (input) => {
//   return input.allUsers.map(user => {
//     return <option value={user.id}>{user.name}</option>
//   })
// }

const NewGroup = (props) => {

  return (
    <div>

      <form onSubmit={(event) => props.handleNewGroupSubmit(event)} id="newGroup">
        <Row>
          <Input onChange={(event) => props.handleNewGroupNameChange(event)} type="text" name="groupName" placeholder="Group Name" value={props.newGroupName} /><br />
          <Input type="select" label="Materialize Select" multiple onChange={(event => props.handleUserSelect(event))}>
            {props.allUsers.map(user => {
              return <option value={user.id}>{user.name}</option>
            })}
          </Input><br />

          <Input type="submit" value="Create Group" />
        </Row>
      </form>


    </div>
  )
}

export default NewGroup
