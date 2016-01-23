'use strict';

var React = require('react-native');

var {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} = React;

module.exports = React.createClass({
  getInitialState() {
      return {
      };
  },
  getDefaultProps() {
      return {
          text: "Create account"  
      };
  },
  render: function() {
    
    return (
      <TouchableOpacity 
        {...this.props}
        style={[styles.container, this.props.style]}>
        <Text style={styles.text}>{this.props.text}</Text>      
      </TouchableOpacity>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    width: 260,
    alignSelf: "center",
    height: 60,
    borderRadius: 4
  },
  text: {
    color: "#1b7eaa",
    fontSize: 20,
    textAlign: "center",
    marginTop:16

  }
});
