import React from 'react'


const showUsers = (props) => {
  let namesArray = []

    props.groupData.users.map( user => {
      namesArray.push(user.name)
    })

    return namesArray.join(", ")
} // end of showUsers


const Group = (props) => {
  return (
    <div className="card-panel teal card-text">
      <h4
        id={props.groupData.id}
        onClick={ (event) => props.handleOnClickGroups(event) } >

        { props.groupData.name }
      </h4>

      {
        props.selectedGroupId === props.groupData.id
        && <div>{showUsers(props)}</div>
      }

    </div>
  ) // end of return
} // end of Group

export default Group
