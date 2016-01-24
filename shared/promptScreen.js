'use strict';

var React = require('react-native');

var GoBack = require('../shared/goBack.js')
var TopSpacer = require('../shared/topSpacer.js')

var {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

var PromptScreen = React.createClass({
  getInitialState() {
    return {
    };
  },
  getDefaultProps() {
    return {
      screenTitle: "",
      submitText: "Next",
      showSubmit: true,
      titleMargin: 30
    }
  },
  propTypes: {
      promptTitle: React.PropTypes.string.isRequired,
      screenTitle: React.PropTypes.string.isRequired,
      onBackPress: React.PropTypes.func.isRequired,
      onSubmit: React.PropTypes.func,
      showSubmit: React.PropTypes.bool,
  },
  getSubmit() {
    if (this.props.showSubmit) {
      return  <TouchableOpacity
          onPress={this.props.onSubmit}
          style={styles.button}>
          <Text
            style={styles.buttonText}>{this.props.submitText}</Text>
        </TouchableOpacity>
    }
  },
  render: function() {
    return (
      <View style={styles.container}>        
        <TopSpacer />
        <GoBack 
          backTitle={this.props.backTitle}
          title={this.props.screenTitle}
          onPress={this.props.onBackPress}/>

        <Text
          style={[styles.promptTitle, {
            marginTop:this.props.titleMargin,
          }]}>
          {this.props.promptTitle}
        </Text>

        <View style={styles.inputContainer}>
          {this.props.children}
        </View>

       {this.getSubmit()}

      </View>
    );
  }
});


module.exports = PromptScreen;

var styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#0079c0",
  },
  promptTitle: {
    textAlign: "center",
    fontSize: 28,
    marginTop:30,
    paddingRight:30,
    paddingLeft:20,
    color: "#FFF",
    fontWeight:"200"
  },
  inputContainer: {
    marginTop:24
  },
  button:{
    marginTop: 28,
    padding: 16,
    backgroundColor: "#0668A2",
    width: 200,
    borderRadius: 4,
    alignSelf:"center"
  },
  buttonText:{
    textAlign:"center",
    color:"#FFF",
    fontSize:20,
  },  
});
