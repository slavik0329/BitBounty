'use strict';

var React = require('react-native');

var {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
} = React;

module.exports = React.createClass({
    getDefaultProps: function () {
        return {
        };
    },
    
    render: function () {
        var screenSize = Dimensions.get('window');

        return (
            <TouchableOpacity
                {...this.props}
                style={{
                    width: screenSize.width
                }}>
              <Text style={styles.text}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
});

var styles = StyleSheet.create({
    text: {
      color: "#FFF",
      textAlign: "center",
      marginTop: 30
    },
});
