import React from 'react'


// const handleIsGroupClicked = (input) => {
//   return input.groupData.users.map( user => {
//       return <li>{}
//     })
// }
const Group = (props) => {
  return (
    <div className="single-group" onClick={(event) => props.handleOnClickGroups(event)}>

      <h1 id={props.groupData.id} >{props.groupData.name}</h1>

      {
        props.selectedGroupId === props.groupData.id
        && <ul>{props.groupData.users.map( user => { return <li key={user.id}>{user.name}</li> } ) } </ul>

      }

    </div>
  )
}

export default Group
