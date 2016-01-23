'use strict';

var React = require('react-native');

var {
  StyleSheet,
  TextInput,
  Dimensions,
  View,
} = React;

module.exports = React.createClass({
  render: function() {
    var screenSize = Dimensions.get('window');
    var inputWidth = 0.9 * screenSize.width;

    return (
      <View style={[styles.container, {
        width: inputWidth
      }]}>
          <TextInput
              {...this.props}
              autoCapitalize={"none"}
              autoCorrect={false}
              style={styles.input}
              placeholderTextColor={"#FFF"}
            />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: 280,
    marginBottom:15,
  },
  input: {
    color:"#FFF",
    height: 40,
    backgroundColor:"#0587D4",
    paddingLeft: 10,
    borderRadius:4,
    fontSize:14,
  },
  white: {
    color: "#FFF",
  }
});
