import React from 'react'
import Group from './Group.js'

const renderGroups = (arr, fn) => {
  return arr.map( g => {
    return (
      <Group key={g.id} groupData={g} handleOnClickGroups={fn} />
    )
  })
}

const GroupsContainer = (props) => {
  return (
    props.data ? renderGroups(props.data.groups, props.handleOnClickGroups) : <h1>No data</h1>
    // props.data ? <h1>{console.log("InGroupsContainer: ", props.data.groups)}</h1> : <h1>No data</h1>
  )
}

export default GroupsContainer
