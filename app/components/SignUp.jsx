import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {signUp} from 'APP/app/reducers/auth';
import {connect} from 'react-redux';
import NavBar from './NavBar';
import Paper from 'material-ui/Paper';

const style = {
  button : {
    margin: 20
  },
  title : {
    fontFamily : "Roboto, sans-serif",
    color : "#FA8072"
  },
  container : {
    textAlign : "center",
    paddingTop : "5%"
  },
  form : {
    width: '50%',
    height: '50%',
    marginLeft: '25%',
    paddingTop : '5px'
  }
};

function mapDispatchToProps(dispatch) {
  return {
    signUpSubmit: function(name, email, password) {
      dispatch(signUp(name, email, password));
    }
  }
}

export default connect (null, mapDispatchToProps) (
  class SignUp extends Component{
    constructor(){
      super();
      this.state = {
        password : "",
        errorText : "",
        disabled : true
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleChangeConfirm = this.handleChangeConfirm.bind(this);
    }

    handleSubmit(evt){
      evt.preventDefault();
      this.props.signUpSubmit(evt.target.name.value, evt.target.email.value, evt.target.password.value);
    }

    handleChangePassword(evt){
        this.setState({
          password : evt.target.value
        })
    }

    handleChangeConfirm(evt){
      if(this.state.password !== evt.target.value){
        this.setState({
            errorText : "Passwords must match.",
            disabled: true
        })
      } else{
        this.setState({
            errorText : "",
            disabled : false
        })
      }
    }

    render(){
     return (
        <div>
          <NavBar/>
          <div style={ style.container }>
            <Paper style={style.form} zDepth={2} >
              <h1 style={ style.title } >Sign Up</h1>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <TextField
                    name="name"
                    hintText="Name"
                    floatingLabelText="Name"
                    onChange={this.handleChangeName}
                  /><br />
                  <br />
                  <TextField
                    name="email"
                    hintText="Email"
                    floatingLabelText="Email"
                    onChange={this.handleChangeEmail}
                  /><br />
                  <br />
                  <TextField
                    name="password"
                    hintText="Password"
                    floatingLabelText="Password"
                    type="password"
                    onChange={this.handleChangePassword}
                  /><br />
                  <br />
                  <TextField
                    name="passwordConfirm"
                    hintText="Confirm Password"
                    floatingLabelText="Confirm Password"
                    type="password"
                    errorText={this.state.errorText}
                    onChange={this.handleChangeConfirm}
                  /><br />
                  <br />
                  <RaisedButton type="submit" value="signUp" label="Sign Up" backgroundColor="#FA8072" style={ style.button } disabled={this.state.disabled} labelStyle={{color: 'white'}}/>
                </div>
              </form>
            </Paper>
          </div>
        </div>
      );
    }
})




