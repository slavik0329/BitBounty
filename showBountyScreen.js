'use strict';

var React = require('react-native');
var GoBack = require('./shared/goBack.js');
var TopSpacer = require('./shared/topSpacer.js');
var UserBountyHeader = require('./common/userBountyHeader.js');


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
          title={"View Bounty"}/>
        <View style={styles.block}>
          <View style={styles.top}>
            <UserBountyHeader 
              username={this.props.data.username}
              bountyAmount={this.props.data.bountyAmount}
              userImage={this.props.data.userImage}
            />

            <Text style={styles.title}>{this.props.data.title}</Text>
          </View>

          {/*<Text style={styles.subtitle}>Description</Text>*/}
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
  },
 block: {
  padding:8
 },
 title :{
  fontSize: 18,
  marginTop: 4,
  fontWeight: "bold",
  fontFamily: "Bitter",
  textAlign: "center",
  color: "#333"
 },
 top: {
  borderBottomWidth: 1,
  borderColor: "#ddd",
  paddingBottom: 8
 },
 subtitle: {
  color: "#ccc",
  fontSize: 16,
  fontWeight: "bold",
  marginTop: 6
 }
});
