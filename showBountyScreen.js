'use strict';

var React = require('react-native');
var GoBack = require('./shared/goBack.js');
var TopSpacer = require('./shared/topSpacer.js');
var BorderButton = require('./shared/borderButton.js');
var UserBountyHeader = require('./common/userBountyHeader.js');
var WideButton = require('./shared/wideButton.js');
var BountyMapScreen = require('./bountyMapScreen.js');


import {connect} from 'react-redux/native'
// import {login, logout, menuChange} from './app/actions/main'

var {
  AlertIOS,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = React;

var StartScreen = React.createClass({
  getInitialState() {
      return {
        requested: false
      };
  },
  componentDidMount () {
   
  },
  requestToComplete () {
    AlertIOS.alert(
      'Confirm',
      'Are you sure you want to request this bounty from '+this.props.data.username+'?',
      [
        {text: 'No', onPress: () => console.log('no Pressed!')},
        {text: 'Yes', onPress: () => {
          this.setState({
            requested: true
          })
        }},
      ]
    ); 
  },
  cancelRequest () {
    AlertIOS.alert(
      'Confirm',
      'Are you sure you want to cancel this bounty request from '+this.props.data.username+'?',
      [
        {text: 'No', onPress: () => console.log('no Pressed!')},
        {text: 'Yes', onPress: () => {
          this.setState({
            requested: false
          })
        }},
      ]
    ); 
  },
  getMapButton() {
    if ( this.props.data.location ) {
      return <BorderButton 
        style={{
          borderBottomWidth:0
        }}
        onPress={()=> {
          this.props.navigator.push({
            component: BountyMapScreen,
            passProps: {
              region: {
                latitude: this.props.data.location.latitude,
                longitude: this.props.data.location.longitude,
                latitudeDelta: 3,
                longitudeDelta: 3
              }
            }
          })
        }}
        title="View location on map"/>
    } else {
      return <View style={styles.spacer}></View>
    }
  },
  getBottomButton () {
    if ( this.state.requested ) {
      return <WideButton 
          onPress={this.cancelRequest}
          title="Cancel request"/>
    } else {
      return <WideButton 
          onPress={this.requestToComplete}
          title="Request to complete"/>
    }
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
            <Text 
              style={styles.title}>{this.props.data.title}</Text>
          </View>

          <ScrollView 
            automaticallyAdjustContentInsets={false}
            style={styles.scroll}>
          <Text 
            style={styles.description}>{this.props.data.description}</Text>
          </ScrollView>


        </View>

        {this.getMapButton()}

        <BorderButton 
          title={"Contact " + this.props.data.username}/>

        {this.getBottomButton()}
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
 scroll: {
  height: 354
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
 },
 description: {
  marginTop: 6,
  color: "#666",
  fontSize:16
 },
 spacer: {
  height: 48
 }
});
