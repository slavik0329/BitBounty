'use strict';

var React = require('react-native');

var PromptScreen = require('../shared/promptScreen.js')
var MapWithCenterPin = require('../shared/mapWithCenterPin.js')

// var BountyLocationScreen = require('./bountyLocationScreen.js')

import {connect} from 'react-redux/native'
import {setLocation} from '../app/actions/addBounty'

var {
  StyleSheet,
  TextInput,
  View,
} = React;

var timer;

var PickupAvailableScreen = React.createClass({
  getInitialState() {
    return {
      region: {
        latitude: 0,
        latitudeDelta: 20,
        longitude: 0,
        longitudeDelta: 20,
        minDelta: 0.3,
        firstLoadComplete: false,
        maxDelta: null,
      },  
      showsUserLocation: true  
    };
  },
  componentWillUnmount() {
      clearTimeout(timer)  
  },
  componentWillMount() {
    timer = setTimeout( () => {
      this.setState({
        minDelta: null,
        firstLoadComplete: true
      })
      
    }, 5000)

    if ( this.props.addBounty.data.location ) {
      console.log(this.props.addBounty.data.location)

      this.setState({
        region: {
          latitude: this.props.addBounty.data.location.latitude,
          longitude: this.props.addBounty.data.location.longitude,
          latitudeDelta: 0,
          longitudeDelta: 0,
        },
        maxDelta: .04,
        showsUserLocation: false
      });
    } else {
      

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0,
              longitudeDelta: 0,
            },
            firstLoadComplete: true
          });
        }
      );
    }
    
  },
  handleSubmit(){

    this.props.navigator.push({
      component: BountyLocationScreen
    });
    
  },
  handleAmountChange(amount) {
    this.props.dispatch(setAmount(amount))
  },
  regionChange(reg) {
    if ( this.state.firstLoadComplete ) {
      this.setState({
        locationRegion: {
          ...this.state.region,
          latitude: reg.latitude,
          longitude: reg.longitude
        }
      }, ()=> {
        // this.updateLocationName();
      })

      this.props.dispatch(setLocation({
        latitude: this.state.region.latitude,
        longitude: this.state.region.longitude,
      }))


    }
  },
  render: function() {
    return (
      <View style={styles.container}>        
        <PromptScreen
          promptTitle="Where will this need to be completed?"
          onSubmit={this.handleSubmit}
          screenTitle={"Add Bounty"}
          onBackPress={()=>{
            this.props.navigator.pop()
          }}>
          
          <MapWithCenterPin
            region={this.state.region}
            minDelta={this.state.minDelta}
            maxDelta={this.state.maxDelta}
            showsUserLocation={this.state.showsUserLocation}
            onRegionChangeComplete={this.regionChange}/>

        </PromptScreen>  
      </View>
    );
  }
});

function mapStateToProps(state) {
  return {
    addBounty: state.addBounty
  }
}

module.exports = connect(mapStateToProps)(PickupAvailableScreen)

var styles = StyleSheet.create({
  container: {
    flex:1,
  }, 
  textInput: {
    color:"#FFF",
    height: 40,
    backgroundColor:"#0587D4",
    padding:8,
    borderRadius:4,
    fontSize:16,
    width: 150,
    alignSelf:"center",
    fontWeight:"200"
  },
});
