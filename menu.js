'use strict';

var React = require('react-native');
var TopSpacer = require('./shared/topSpacer.js');
var MenuItem = require('./menuItem.js');
var MyBountyScreen = require('./myBountyScreen.js');

import {connect} from 'react-redux/native'
import {logout, menuChange} from './app/actions/main'

var {
  Dimensions,
  StyleSheet,
  Text,
  View,
} = React;

const window = Dimensions.get('window');

var Menu = React.createClass({
  getInitialState() {
      return {
        account: {
          email: ""
        }
      };
  },
  componentDidMount() {
  },
  componentDidUpdate(prevProps, prevState) {

  },
  getLogoutText () {
    var account = this.props.main.account;

    var text = "Log Out ";

    if ( account.username ) {
      text += account.username;
    }

    return text;
  },
  handleLogout () {
    this.props.dispatch( logout() )   
  },
  handleBounties() {
    this.props.dispatch(menuChange(false))
    this.props.navigator.push({
      component: MyBountyScreen
    })
  },
  render: function() {

    return (
      <View style={styles.container}>
        <TopSpacer 
          backColor={"#0079c0"}/>
        <MenuItem 
          title="My Bounties"
            onPress={this.handleBounties}
        />
        <MenuItem 
          title="Settings"
            onPress={this.handleSettings}
        />
        <MenuItem 
          title={this.getLogoutText()}
            onPress={this.handleLogout}
        />
      </View>
    );
  }
});

function mapStateToProps(state) {
  return {
    main: state.main
  }
}

module.exports = connect(mapStateToProps)(Menu)

var styles = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#0079c0',
  },
  text: {
    color: "#FFF",
    textAlign: "right"
  }

});
