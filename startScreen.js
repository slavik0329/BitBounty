'use strict';

var React = require('react-native');
var LoginInput = require('./shared/loginInput.js');
var LoginButton = require('./shared/loginButton.js');
var AlternateLoginButton = require('./shared/alternateLoginButton.js');
var HomeScreen = require('./homeScreen.js');
var API = require('./api.js');
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
  componentWillReceiveProps(nextProps) {
      if ( !nextProps.main.account.email ) {
        this.setState({
          loading: true
        });
        
        API.logout( (res) => {
          this.props.dispatch( menuChange(false) );
          
          Utils.setStorage("ACCOUNT_SECRET", null);
          
          this.setState({
            loading: false
          });
          
          setTimeout(()=> { // Timeout makes logout smoother
            this.props.navigator.pop();
          }, 300)
        })
      }
  },
  componentDidMount () {
    this.loginFromStorage();
  },
  loginFromStorage() {
    Utils.getStorage("ACCOUNT_SECRET", (secret) => {
      if ( secret ) {
        this.setState({
          loading: true
        });

        API.login(secret.email, secret.password, (res)=> {
          if ( res.error ) {
            
          } else {
            this.doLogin(res.user)
          }

          this.setState({
            loading: false
          });
        });
      }
    })
  },
  handleLogin: function () {
    if ( !this.state.loginEmail || !this.state.loginPassword ) {
      this.setState({
        error: "You are missing some fields"
      })

      return;
    }

    this.setState({
      loading: true
    });

    API.login(this.state.loginEmail, this.state.loginPassword, (res)=> {
      if ( res.error ) {
        this.setState({
          error: res.error
        })
      } else {
        Utils.setStorage("ACCOUNT_SECRET", {
          email: this.state.loginEmail,
          password: this.state.loginPassword
        });

        this.doLogin(res.user)
      }

      this.setState({
        loading: false
      });
    });


  },
  handleSignup: function () {
    if ( !this.state.loginEmail || !this.state.loginPassword || !this.state.loginPassword2 ) {
      this.setState({
        error: "You are missing some fields"
      })

      return;
    }

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    if ( !validateEmail(this.state.loginEmail) ) {
      this.setState({
        error: "Email not valid!"
      })

      return;
    }

    if ( this.state.loginPassword != this.state.loginPassword2 ) {
      this.setState({
        error: "Passwords do not match"
      })

      return;
    }

    this.setState({
      loading: true
    });

    API.signup(this.state.loginEmail, this.state.loginPassword, (res)=> {

      if ( res.error ) {
        this.setState({
          error: res.error
        })
      } else {
        Utils.setStorage("ACCOUNT_SECRET", {
          email: this.state.loginEmail,
          password: this.state.loginPassword
        });
        this.doLogin(res.user)
      }

      this.setState({
        loading: false
      });
    });


  },
  doLogin(user) {

    this.props.dispatch( login( {
      _id: user._id,
      email: user.local.email,
      username: user.local.username,
      userImage: user.image
      // userImage: "https://scontent-lga3-1.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/12509393_1070608089648598_9164631129840436749_n.jpg?oh=2634821f8d87055bdf235148c0736304&oe=57048AC4"
    }));  

    this.props.navigator.push({
      name: 'Scene ' + 1,
      index: 1,
      component: HomeScreen
    });

    this.setState({
      loginEmail: "",
      loginPassword: "",
      loginPassword2: ""
    })

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
    top: -12
  },
});
