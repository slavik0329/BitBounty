'use strict';

var React = require('react-native');
var LoginInput = require('./shared/loginInput.js');
var LoginButton = require('./shared/loginButton.js');
var AlternateLoginButton = require('./shared/alternateLoginButton.js');
var HomeScreen = require('./homeScreen.js');
// var API = require('./api.js');
var Utils = require('./shared/utils.js');

import {connect} from 'react-redux/native'
import {login, logout, menuChange} from './app/actions/main'

var {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} = React;

var StartScreen = React.createClass({
  getInitialState() {
      return {
        loginEmail: "",
        loginPassword: "",
        loginPassword2: "",
        loginType: "create",
        loading: false
      };
  },
  componentDidMount () {
    setTimeout(()=>{
      this.doLogin();
    }, 50 );

  },

  handleLogin: function () {

    this.doLogin();

  },
  handleSignup: function () {
    this.doLogin();


  },
  doLogin(user) {

    this.props.navigator.push({
      name: 'Scene ' + 1,
      index: 1,
      component: HomeScreen
    });


  },

  getBottomText() {
    if ( this.state.loginType == "create" ) {
      return <AlternateLoginButton 
                text={"Already have an account?"}
                onPress={()=>this.setState({loginType:"login"})}
                />
    } else {
      return <AlternateLoginButton 
                text={"Don't have an account?"}
                onPress={()=>this.setState({loginType:"create"})}
                />
    }
  },
  getRepeatPassword() {
    if ( this.state.loginType == "create" ) {
      return <LoginInput 
        placeholder="Repeat Password"
        onChangeText={(loginPassword2)=>this.setState({loginPassword2})}
        value={this.state.loginPassword2}
        password={true}
      />
    }
  },
  getLoginButton() {
    var text;

    if (this.state.loginType == "login" ) {
      text = "Login";
      var onPress = this.handleLogin
    } else {
      var onPress = this.handleSignup
    }

    return <LoginButton 
      onPress={onPress}
      text={text}
      style={{
        marginTop:25
      }}/>
  },
  render: function() {
    var containerTopPadding = 50;
    var inputsTopMargin = 0;
    var errorMargin = 16;

    if ( Dimensions.get("window").height < 500 )
    {
      containerTopPadding = 10;
      errorMargin = 8;
      inputsTopMargin = 8;
    }

    return (
      <View style={[styles.container,{
        paddingTop: containerTopPadding
      }]}>

        <Text style={styles.logo}>Bounti</Text>
        {/*<Text style={styles.subtitle}>Hacking hunger.</Text>*/}

        <Text 
          style={[styles.error, {
            marginTop: errorMargin
          }]}>{this.state.error}</Text>

        <View style={[styles.inputs, {
          marginTop: inputsTopMargin,
        }]}> 

          <LoginInput 
            placeholder="E-mail address"
            onChangeText={(loginEmail)=>this.setState({loginEmail})}
            value={this.state.loginEmail}
          />

          <LoginInput 
            placeholder="Password"
            onChangeText={(loginPassword)=>this.setState({loginPassword})}
            value={this.state.loginPassword}
            password={true}
          />

          {this.getRepeatPassword()}

          {this.getLoginButton()}

          {this.getBottomText()}
        </View>
      </View>
    );
  }
});

function mapStateToProps(state) {
  return {
    main: state.main
  }
}

module.exports = connect(mapStateToProps)(StartScreen)

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0079c0",
    position: "relative",
    alignItems: "center",
  },
  logo: {
    fontSize: 50,
    marginTop:0,
    color: "#FFF",
    fontFamily: "Bitter"
  },
  subtitle: {
    color: "#FFF"
  },
  inputs: {
  },
  error: {
    textAlign: "center",
    color: "orange",
    marginBottom: 4,
  },
});
