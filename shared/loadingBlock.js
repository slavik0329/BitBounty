'use strict';

var React = require('react-native');

var {
  ActivityIndicatorIOS,
  StyleSheet,
  Text,
  View,
} = React;

module.exports = React.createClass({
  getInitialState() {
      return {
      
      };
  },
  getDefaultProps() {
      return {
          title: "Loading",
          visible: true  
      };
  },
  render: function() {
    var heightStyle = {};

    if ( !this.props.visible ) {
      heightStyle.height = 0;
    }
    return (
      <View style={heightStyle}>
        <View style={[styles.container]}>
          <View>
            <Text style={styles.text}>{this.props.title}</Text>
          </View>
          <View style={styles.spinner}>
            <ActivityIndicatorIOS
                    animating={true}
                  />
          </View>
        </View>
      </View>
    );  
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    justifyContent:"center",
    overflow: "hidden"
  },
  spinner: {
    marginLeft:10,
    marginTop: 3
  },
  text: {
    fontSize: 20,
    fontWeight: "200"
  }
  


});