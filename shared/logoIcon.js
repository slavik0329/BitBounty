'use strict';

var React = require('react-native');
var { Icon, } = require('react-native-icons');

var {
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
} = React;

module.exports = React.createClass({
    getText() {
        if ( !this.props.icon ) {
            return <Text style={styles.logoStyle}>B</Text>
        } else {
            return <Icon
              name={this.props.icon}
              size={35}
              color='#FFF'
              style={{
                width: 35,
                height: 35
              }}
            />
        }
    },
    render: function () {
       
        return (

            <TouchableOpacity 
                onPress={this.props.onPress}
                style={[styles.logoBox, this.props.style]}>
                {this.getText()}
            </TouchableOpacity>
        );
    }
});

var styles = StyleSheet.create({
    logoStyle: {
        fontSize: 28,
        textAlign: "center",
        color: "#FFF",
        backgroundColor: "rgba(0,0,0,0)",
        fontFamily:"Bitter"
    },
    logoBox: {
        // backgroundColor: "#0587D4",
        width: 35,
        height: 35,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center"
    }
});
