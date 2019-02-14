import React from 'react'
import {Input, Row, Button} from 'react-materialize'



const SignUpForm = (props) => {
  console.log(props)

  return(
    <div style={ { textAlign: 'center'} }>
      <h1>Welcome to WePlan</h1>
      <div style={ { display: 'inline-block'} }>
        <form onSubmit={(event) => props.handleLogInSubmit(event)}>
          <Row>
            <Input onChange={(event) => props.handleLogInInput(event)} type="text" name="logInName" placeholder="Enter Name" value={props.logInName}/>
          </Row>
          <Row>
            <Input onChange={(event) => props.handleLogInInput(event)} type="text" name="logInEmail" placeholder="Enter Email" value={props.logInEmail}/>
          </Row>
          <Row>
            <Button type="submit">Log In</Button>
          </Row>
        </form>
      </div>
    </div>

  )
}

export default SignUpForm;
