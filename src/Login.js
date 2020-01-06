import React, { Component } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

class LoginForm extends Component {
  loginClicked() {
    this.props.onLoginFinished(this.state.username, this.state.password);
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render () {
    return <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
      <Grid.Column style={{maxWidth: 450}}>
        <Header as='h2' color='teal' textAlign='center'>
          Geoanalyzer Login
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              onChange={this.handleChange}
              name='username'/>
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              name='password'
              type='password'
              onChange={this.handleChange}
            />

            <Button color='teal' fluid size='large' onClick={this.loginClicked.bind(this)}>
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>;
  }
}

export default LoginForm;