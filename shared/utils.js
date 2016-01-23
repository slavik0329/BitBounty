var React = require('react-native');

var { AsyncStorage } = React;

var AsyncStorage = React.AsyncStorage

module.exports = {
	setStorage: function ( key, val ) {
		AsyncStorage.setItem(key, JSON.stringify(val), function (err) {
			if ( err ) {
				console.log("SetStorage error: ", err)
			}
		})
	},
	getStorage: function ( key, callback ) {
		AsyncStorage.getItem(key, function (err, val) {
			if ( err ) {
				console.log("GetStorage error: ", err)
			} else {
				callback( JSON.parse(val) )
			}
		})
	},
	getLocationName: function  ( latitude, longitude, callback ) {
		fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+"," + longitude).then((res)=>res.json()).then((res)=>{
		  var components = res.results[0].address_components;
		  var output = {};

		  components.forEach(function (component) {
		  	if ( component.types.indexOf("locality") != -1 ) {
		  		output.city = component.short_name;
		  	}

		  	if ( component.types.indexOf("administrative_area_level_1") != -1 ) {
		  		output.state = component.short_name;
		  	}
		  });
		  callback( output );
		})
	}
}