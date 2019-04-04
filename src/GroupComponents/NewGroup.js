import React from 'react'
import {Input, Button} from 'react-materialize'


const NewGroup = (props) => {
  return (

    <div>
      <h4>New Group</h4>

      <form
        onSubmit={ (event) => props.handleNewGroupSubmit(event) }
        id="newGroup" >

          <Input
            onChange={ (event) => props.handleNewGroupNameChange(event) }
            type="text"
            name="groupName"
            label="Group Name"
            value={props.newGroupName} />

          <Input
            type="select"
            label="Select Users"
            multiple
            onChange={ (event => props.handleUserSelect(event)) } >

              {
                props.allUsers.map(user => {
                  return <option value={user.id}>{user.name}</option>
                })
              }

          </Input>

          <Button type="submit">Create Group</Button>

      </form>
    </div>

  ) // end of return
} // end of NewGroup

export default NewGroup
