'use strict';

var React = require('react-native');
var MenuButton = require('../shared/menuButton');
var LogoIcon = require('../shared/logoIcon.js');

var { Icon, } = require('react-native-icons');

var {
    Dimensions,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} = React;

module.exports = React.createClass({
    getDefaultProps: function () {
        return {
            backTitle: "Back"
        };
    },
    getTitle: function () {
        var screenSize = Dimensions.get('window');

        var width = 160;

        if ( this.props.title ) {
            return <Text 
            style={[styles.centerText, {
                left: (screenSize.width/2 - (width/2)),
                width: width
            }]}>
                {this.props.title}
            </Text>
        } else {
            return null;
        }
    },
    render: function () {

        return (
            <View style={this.props.style}>
                <View 
                style={[styles.backContainer]}
                >
                    <TouchableOpacity
                        onPress={this.props.onPress}
                        style={styles.backBox}>
                        <Icon
                          name={"fontawesome|chevron-left"}
                          size={26}
                          color='#FFF'
                          style={[styles.icon, {
                            width: 26,
                            height: 26,
                            left: -10
                          }]}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            left: 28,
                            top: 5
                        }}
                        onPress={this.props.onPress}>
                        <Text style={styles.textStyle}>{this.props.backTitle}</Text>

                    </TouchableOpacity>
                    
                    {this.getTitle()}

                    {/*<MenuButton />*/}
                </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    backBox: {
        width: 80
    },
    backContainer: {
        padding:13,
        position:"relative",
        backgroundColor: "#0079c0"
    }, 
    textStyle: {
        fontSize: 18,
        color:"#FFF",
        top: 9,
        left: 4
    },
    centerText: {
        position:"absolute",
        top: 12,
        color: "#FFF",
        textAlign:"center",
        fontSize:16,
        lineHeight:23,
    }
});
