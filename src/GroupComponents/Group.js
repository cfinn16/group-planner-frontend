import React from 'react'

const Group = (props) => {
  return (
    <div className="single-group" onClick={(event) => props.handleOnClickGroups(event)}>
      <h1 id={props.groupData.id} >{props.groupData.name}</h1>


    </div>
  )
}

export default Group
