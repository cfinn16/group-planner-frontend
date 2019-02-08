import React from 'react'

const Event = (props) => {
  return (
    <div className="single-event">
      <h1 id={props.data.id} >{props.data.name}</h1>


    </div>
  )
}

export default Event
