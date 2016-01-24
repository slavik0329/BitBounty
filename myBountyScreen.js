'use strict';

var React = require('react-native');
var GoBack = require('./shared/goBack.js');
var TopSpacer = require('./shared/topSpacer.js');

import {connect} from 'react-redux/native'
// import {login, logout, menuChange} from './app/actions/main'

var {
  Dimensions,
  StyleSheet,
  Text,
  View,
} = React;

var StartScreen = React.createClass({
  getInitialState() {
      return {
        
      };
  },
  componentDidMount () {
   
  },
  render: function() {
    return (
      <View style={[styles.container]}>
        <TopSpacer />
        <GoBack 
          onPress={()=>{
            this.props.navigator.pop();
          }}
          title="My Bounties"/>
        
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
  },
 
});
