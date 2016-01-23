'use strict';

var React = require('react-native');
var LogoIcon = require('../shared/logoIcon.js');
var MenuButton = require('../shared/menuButton.js');

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
          toText: null
        };
    },
    getTitle: function () {
        var screenSize = Dimensions.get('window');

        if ( this.props.title ) {
            return <Text 
            style={[styles.centerText, {
                left: (screenSize.width/2 - 100),
            }]}>
                {this.props.title}
            </Text>
        } else {
            return null;
        }
    },
    render: function () {
        var backStyle = styles.blueBack;
        var backTextStyle = styles.whiteText;
       
        return (
            <View 
            style={[styles.backContainer, backStyle]} {...this.props}
            > 
                <MenuButton />
               
                {this.getTitle()}

                <LogoIcon
                    style={styles.plusButton}
                    onPress={this.props.onAddPress}
                    icon="fontawesome|plus-circle"/>                
            </View>
        );
    }
});

var styles = StyleSheet.create({
    blueBack: {
        backgroundColor: "#0079c0"
    },
    whiteText: {
        color:"#FFF"
    },
    backContainer: {
        padding:5,
        position:"relative",
        
    }, 
    centerText: {
        position:"absolute",
        top: 9,
        width: 200,
        color: "#FFF",
        textAlign:"center",
        fontSize: 22,
        fontFamily: "Bitter"
    },
    plusButton: {
        position: "absolute",
        top: 5,
        right: 5,
    }
});
