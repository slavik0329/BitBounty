'use strict';

var React = require('react-native');

var {
    StyleSheet,
    View,
} = React;

module.exports = React.createClass({
    getDefaultProps: function () {
        return {
          backColor: '#0079c0',
        };
    },
    
    render: function () {

        return (
            <View style={[styles.container, {
                backgroundColor: this.props.backColor
            }]}>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        height: 20,
    }
});
