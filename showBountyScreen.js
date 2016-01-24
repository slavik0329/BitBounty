'use strict';

var React = require('react-native');
var GoBack = require('./shared/goBack.js');
var TopSpacer = require('./shared/topSpacer.js');
var BorderButton = require('./shared/borderButton.js');
var UserBountyHeader = require('./common/userBountyHeader.js');
var WideButton = require('./shared/wideButton.js');
var BountyMapScreen = require('./bountyMapScreen.js');
var ShowBountyRequestsScreen = require('./showBountyRequestsScreen.js');
var API = require('./api.js');
var BlurModal = require('./shared/blurModal.js');

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
        requested: false,
        modalVisible: false
      };
  },
  componentDidMount () {
    API.getBounty(this.props.data._id, (res) => {
      res.bounty.requests.forEach((request)=>{
        if ( request.userId == this.props.main.account._id ) {
          this.setState({
            requested:true
          })
        }
      })
    })
  },
  requestToComplete () {
    AlertIOS.alert(
      'Confirm',
      'Are you sure you want to request this bounty from '+this.props.data.username+'?',
      [
        {text: 'No', onPress: () => console.log('no Pressed!')},
        {text: 'Yes', onPress: () => {
          API.requestBounty(this.props.data._id, (res)=>{
            
          })

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
  getRequestsButton() {
    if ( this.props.data.requests.length ) {
      return <BorderButton 
        style={{
           borderBottomWidth:0
        }}
        onPress={()=> {
          this.props.navigator.push({
            component: ShowBountyRequestsScreen,
            passProps: {
              bounty: this.props.data
            }
          })
        }}
        title={"Show Requests ("+ this.props.data.requests.length +")"}/>
    } else {
      return <View style={styles.spacer}></View>
    }
  },
  releasePayment() {
    this.setState({
      modalVisible: true
    })
  },
  getBottomButton () {
    
    if ( this.props.data.accepted ) {
      return <WideButton 
          onPress={this.releasePayment}
          title="Release payment"/>
    }

    if ( this.props.main.account._id == this.props.data.userId ) {
      return <WideButton 
          onPress={this.cancelRequest}
          title="Edit bounty"/>
    }

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
  getModal() {
    return <BlurModal 
          visible={this.state.modalVisible}>
          <View
            style={styles.modalInner}>
            <Text 
              style={styles.modalText}>Sending transaction...</Text>

              
              
              <WideButton
                style={{
                  marginTop: 20
                }}
                onPress={()=>{
                  this.setState({
                    modalVisible: false
                  })
                }} 
                title={"Cancel"}/>

          </View>
        </BlurModal>
  },
  render: function() {

    return (
      <View style={[styles.container]}>
        {this.getModal()}
        <TopSpacer />
        <GoBack 
          onPress={()=>{
            this.props.navigator.pop();
          }}
          title={"View Bounty"}/>
        <View style={styles.block}>
          <View style={styles.top}>
            <UserBountyHeader 
              userId={this.props.data.userId}
              username={this.props.data.username}
              bountyAmount={this.props.data.amount}
              userImage={this.props.data.userImage}
            />
            <Text 
              style={styles.title}>{this.props.data.title}</Text>
          </View>

          <ScrollView 
            automaticallyAdjustContentInsets={false}
            style={styles.scroll}>
          <Text 
            style={styles.description}>{this.props.data.notes}</Text>
          </ScrollView>


        </View>

        {this.getRequestsButton()}

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
  height: 306
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
 },
 modalInner: {
   backgroundColor: "#0079c0",
   marginTop: 80,
   padding: 15,
   marginRight:15,
   marginLeft:15,
   borderRadius: 4
 },
 modalText: {
   color: "#FFF",
   textAlign: "center",
   fontSize: 18
 },
 modalAmount: {
   fontSize: 24
 }
});
