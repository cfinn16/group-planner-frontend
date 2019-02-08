import React from 'react'

const NewGroup = (props) => {
  return (
    <div>
      <form onSubmit={(event) => handleNewGroupSubmit(event)}>
        <input type="text" name="groupName" placeholder="Group Name" value="" />
        <input type="submit" value="Create Group" />
      </form>


    </div>
  )
}

export default NewGroup
