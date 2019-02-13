import React from 'react'
import {SideNavItem} from 'react-materialize'


// const handleIsGroupClicked = (input) => {
//   return input.groupData.users.map( user => {
//       return <li>{}
//     })
// }
const Group = (props) => {
  return (
    <div className="single-group">

      <h4 Id={props.groupData.id} onClick={(event) => props.handleOnClickGroups(event)}> {props.groupData.name} </h4>

      {
        props.selectedGroupId === props.groupData.id
        && <ul>{props.groupData.users.map( user => { return <li key={user.id}>{user.name}</li> } ) } </ul>
      }

    </div>
  )
}

export default Group
