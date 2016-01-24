'use strict';

var React = require('react-native');

var PromptScreen = require('../shared/promptScreen.js')

// var BountyNotes = require('./bountyNotes.js')

import {connect} from 'react-redux/native'
import {setNotes} from '../app/actions/addBounty'

var {
  StyleSheet,
  TextInput,
  View,
} = React;

var timer;

var PickupAvailableScreen = React.createClass({
  getInitialState() {
    return {
    };
  },

  componentWillMount() {
    
  },
  handleSubmit(){

    // this.props.navigator.push({
    //   component: BountyLocationScreen
    // });
    
  },
  handleNotesChange(notes) {
    this.props.dispatch(setNotes(notes))
  },
  render: function() {
    return (
      <View style={styles.container}>        
        <PromptScreen
          titleMargin={10}
          promptTitle="Enter an additional description"
          onSubmit={this.handleSubmit}
          screenTitle={"Add Bounty"}
          submitText={"Finish"}
          onBackPress={()=>{
            this.props.navigator.pop()
          }}>
          
          <TextInput
            style={styles.textInput}
            autoFocus={true}
            placeholder={"Notes..."}
            value={this.props.addBounty.data.notes}
            onChangeText={this.handleNotesChange}
            multiline={true}/>

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
    height: 140,
    backgroundColor:"#0587D4",
    padding:8,
    borderRadius:4,
    fontSize:16,
    width: 350,
    fontWeight:"200",
    alignSelf:"center"
  },
});
