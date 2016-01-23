'use strict';

var React = require('react-native');

var {
    Text,
} = React;

module.exports = React.createClass({
    getDefaultProps() {
        return {
            time: new Date()
        };
    },
    
    render: function () {
        
        var ago = timeSince(new Date(this.props.time));

        return (
            <Text>
               {ago}
            </Text>
        );
    },
});



function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + "y";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + "m";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + "d";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + "h";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + "m";
    }
    return Math.floor(seconds) + "s";
}
