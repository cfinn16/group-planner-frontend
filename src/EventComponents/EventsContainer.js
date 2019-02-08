import React from 'react'
import Event from './Event.js'

let selectedGroup = null

const renderEvents = (arr) => {
  return arr.map( event => {
    return (
      <Event key={event.id} data={event}/>
    )
  })
}

// return findGroup(props.data.groups, props.selectedGroupId).events.map( e => {
//   return (
//     <Event key={e.id} eventData={e} />
//   )
// })

// const findGroup = (array, groupId) => {
//   return array.find( g => g.id === groupId )
// }

const EventsContainer = (props) => {
  // console.log("props.data in EventsContainer: ", props.data.groups)



  return (

    // props.data ? <h2>{console.log("props.data.groups.events in EventsContainer: ", props.data.groups[0].events )}</h2> : <h1>No data in EventsContainer</h1>
    //
    // (props.data.length > 0) ? <h2>{console.log("props in EventsContainer: ", props)}</h2> : <h1>No data in EventsContainer</h1>

    (props.data.length > 0) ? renderEvents(props.data) : <h1>No data in EventsContainer</h1>

  )
}

export default EventsContainer
