'use strict';

var React = require('react-native');
var FullSwitch = require('../shared/fullSwitch.js')

var PromptScreen = require('../shared/promptScreen.js')
var BountyMapInputScreen = require('./bountyMapInputScreen.js')

import {connect} from 'react-redux/native'
// import {setLocation} from '../app/actions/addBounty'

var {
  StyleSheet,
  TextInput,
  View,
} = React;

var PickupAvailableScreen = React.createClass({
  getInitialState() {
    return {
      locationEnabled: false
    };
  },
  componentDidMount(){

  },
  handleSubmit(){
    if ( this.state.locationEnabled ) {
      var component = BountyMapInputScreen;
    } else {
      var component = BountyNotesScreen;
    }
    this.props.navigator.push({
      component: BountyMapInputScreen
    });
    
  },
  handleAmountChange(amount) {
    this.props.dispatch(setAmount(amount))
  },
  render: function() {
    return (
      <View style={styles.container}>        
        <PromptScreen
          promptTitle="Does this need to be completed at a particular location?"
          onSubmit={this.handleSubmit}
          screenTitle={"Add Bounty"}
          onBackPress={()=>{
            this.props.navigator.pop()
          }}>
          <FullSwitch 
            value={this.state.locationEnabled}
            onValueChange={(locationEnabled)=>this.setState({locationEnabled})}/>

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
