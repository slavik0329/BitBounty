'use strict';

var React = require('react-native');

var PromptScreen = require('./shared/promptScreen.js')
var BountyAmountScreen = require('./addBounty/bountyAmountScreen.js')

import {connect} from 'react-redux/native'
import {setTitle} from './app/actions/addBounty'

var {
  StyleSheet,
  TextInput,
  View,
} = React;

var PickupAvailableScreen = React.createClass({
  getInitialState() {
    return {
      title: ""
    };
  },
  componentDidMount(){

  },
  handleSubmit(){

    this.props.navigator.push({
      component: BountyAmountScreen
    });
    
  },
  handleTitleChange(title) {
    this.props.dispatch(setTitle(title))
  },
  render: function() {
    return (
      <View style={styles.container}>        
        <PromptScreen
          promptTitle="Enter a title for your bounty request"
          onSubmit={this.handleSubmit}
          screenTitle={"Add Bounty"}
          onBackPress={()=>{
            this.props.navigator.pop()
          }}>
          <TextInput 
            ref={"input"}
            placeholder={"Title"}
            placeholderTextColor={"#0776B7"}
            clearTextOnFocus={true}
            autoFocus={true}
            value={this.props.pickupAvailable.data.title}
            onChangeText={this.handleTitleChange}
            style={styles.textInput}/>
        </PromptScreen>  
      </View>
    );
  }
});

function mapStateToProps(state) {
  return {
    pickupAvailable: state.pickupAvailable
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
    width: 320,
    alignSelf:"center",
    fontWeight:"200"
  },
});
