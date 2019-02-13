import React from 'react'



const Group = (props) => {
  return (
    <div className="card-panel teal">
      <h4
        id={props.groupData.id}
        onClick={ (event) => props.handleOnClickGroups(event) } >

          { props.groupData.name }

      </h4>

      {
        props.selectedGroupId === props.groupData.id
        && <ul>{props.groupData.users.map( user => { return <li key={user.id}>{user.name}</li> })} </ul>
      }

    </div>
  ) // end of return
} // end of Group

export default Group
