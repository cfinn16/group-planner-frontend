import React from 'react'
import Event from './Event.js'
import NewGroup from '../GroupComponents/NewGroup.js'

let selectedGroup = null

const renderEvents = (arr) => {
  return arr.map( event => {
    return (
      <Event key={event.id} data={event}/>
    )
  })
} // end of renderEvents()

const renderNewGroup = () => {

}

// return findGroup(props.data.groups, props.selectedGroupId).events.map( e => {
//   return (
//     <Event key={e.id} eventData={e} />
//   )
// })

// const findGroup = (array, groupId) => {
//   return array.find( g => g.id === groupId )
// }

// change the display based on what the state is
const changeDisplayFromState = (input, fn) => {

      if (input.display === "events") {
      return renderEvents(input.data)
    } else if (input.display === "new-group") {
      return <NewGroup handleNewGroupSubmit={fn}/>
    } else if (input.display === "edit-group") {
      return <h1>"edit group"</h1>
    }
}

const EventsContainer = (props) => {
  // console.log("props.data in EventsContainer: ", props.data.groups)



  return (

    // props.data ? <h2>{console.log("props.data.groups.events in EventsContainer: ", props.data.groups[0].events )}</h2> : <h1>No data in EventsContainer</h1>
    //
    // (props.data.length > 0) ? <h2>{console.log("props in EventsContainer: ", props)}</h2> : <h1>No data in EventsContainer</h1>
    // props.data.length > 0 ?
    //
    // {if (props.display === "events") {
    //     renderEvents(props.data)
    //
    // }}
    // : <h1>No data in EventsContainer</h1>

    (props.data.length > 0)
    ? changeDisplayFromState(props, props.handleNewGroupSubmit)
    : <h1>No data</h1>

  ) // end of return
}

export default EventsContainer
