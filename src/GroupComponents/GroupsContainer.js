import React from 'react'
import Group from './Group.js'
import {SideNavItem} from 'react-materialize'


// class App extends Component {
class GroupsContainer extends React.Component {


  renderGroups = (arr, fn) => {
    // console.log("in GroupsContainer renderGroups: ", arr)

    return arr.map( g => {
      return (
        <Group
        key={g.id}
        groupData={g}
        handleOnClickGroups={fn}
        selectedGroupId={this.props.selectedGroupId}
        />
    ) // end of return
  }) // end of return arr.map
  } // end of renderGroups

  render() {
    return (

      <div>
        <h3>My Groups</h3>
          <button onClick={this.props.handleAddGroup}>+</button>
          <SideNavItem divider />

      {this.props.data ? this.renderGroups(this.props.data.groups, this.props.handleOnClickGroups) : <h1>No data</h1>}
      </div>

      // props.data ? <h1>{console.log("InGroupsContainer: ", props.data.groups)}</h1> : <h1>No data</h1>
    ) // end of return
  } // end of render()
}

export default GroupsContainer
