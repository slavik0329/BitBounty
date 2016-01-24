'use strict';

var React = require('react-native');

var PromptScreen = require('../shared/promptScreen.js')
var BountyLocationScreen = require('./bountyLocationScreen.js')

import {connect} from 'react-redux/native'
import {setAmount} from '../app/actions/addBounty'

var {
  StyleSheet,
  TextInput,
  View,
} = React;

var PickupAvailableScreen = React.createClass({
  getInitialState() {
    return {
    };
  },
  componentDidMount(){

  },
  handleSubmit(){

    this.props.navigator.push({
      component: BountyLocationScreen
    });
    
  },
  handleAmountChange(amount) {
    this.props.dispatch(setAmount(amount))
  },
  render: function() {
    return (
      <View style={styles.container}>        
        <PromptScreen
          promptTitle="How much do you want to award for completion of this bounty?"
          onSubmit={this.handleSubmit}
          screenTitle={"Add Bounty"}
          onBackPress={()=>{
            this.props.navigator.pop()
          }}>
          <TextInput 
            ref={"input"}
            placeholder={"(ex. ฿0.00)"}
            keyboardType="numeric"
            placeholderTextColor={"#0776B7"}
            clearTextOnFocus={true}
            autoFocus={true}
            value={this.props.addBounty.data.amount}
            onChangeText={this.handleAmountChange}
            style={styles.textInput}/>
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
