import React from 'react'
import Group from './Group.js'
import {Button} from 'react-materialize'


class GroupsContainer extends React.Component {


  renderGroups = (arr, fn) => {

    return arr.map( g => {
      return (
        <Group
          key={g.id}
          groupData={g}
          handleOnClickGroups={fn}
          selectedGroupId={this.props.selectedGroupId} />
      ) // end of return
    }) // end of return arr.map

  } // end of renderGroups

  render() {

    return (

      <div>
        <h4>My Groups</h4>
          <Button
            waves="light"
            icon="add"
            onClick={this.props.handleAddGroup} />

        {
          this.props.data
          ? this.renderGroups(this.props.data.groups, this.props.handleOnClickGroups)
          : <h1>No data</h1>
        }

      </div>

    ) // end of return
  } // end of render()

} // end of GroupsContainer

export default GroupsContainer
