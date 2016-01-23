'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

module.exports = React.createClass({
  render: function() {
    return (
      <TouchableOpacity 
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress} >
        <Text
          style={styles.text}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    height:50,
    backgroundColor: "#5EADD0",
    marginTop:0,
  },
  text: {
    color:"#FFF",
    textAlign:"center",
    fontSize: 20,
    lineHeight: 37
  }
});
