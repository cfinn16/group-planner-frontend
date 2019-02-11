import React from 'react'
import Group from './Group.js'



// class App extends Component {
class GroupsContainer extends React.Component {

  // state = {
  //   isClicked: false
  // }

  renderGroups = (arr, fn) => {
    return arr.map( g => {
      return (
        <Group
        key={g.id}
        groupData={g}
        handleOnClickGroups={fn}
        selectedGroupId={this.props.selectedGroupId}
        />
      )
    })
  } // end of renderGroups

  render() {
    return (
      this.props.data ? this.renderGroups(this.props.data.groups, this.props.handleOnClickGroups) : <h1>No data</h1>
      // props.data ? <h1>{console.log("InGroupsContainer: ", props.data.groups)}</h1> : <h1>No data</h1>
    ) // end of return
  } // end of render()
}

export default GroupsContainer
