var Globals = require("./globals.js");
var Serialize = require("./lib/serialize.js");
var FileUpload = require('NativeModules').FileUpload;

module.exports = {

	signup: function (email, password, callback) {
		if ( !email || !password ) {
			return false;
		}

		email = email.toLowerCase().trim();

		fetch('http://'+Globals.url+'/signup', {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/x-www-form-urlencoded',
		  },
		  body: Serialize({ // Serialize urlencodes the form data
		  	email,
		  	password
		  })
		}).then( (res) => res.json() ).then( (res) => {
			callback(res);
		}).catch((err)=> {
			callback(err)
		})
	},
	login: function (email, password, callback) {
		if ( !email || !password ) {
			return false;
		}

		email = email.toLowerCase().trim();

		fetch('http://'+Globals.url+'/login', {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/x-www-form-urlencoded',
		  },
		  body: Serialize({ // Serialize urlencodes the form data
		  	email,
		  	password
		  })
		}).then( (res) => res.json() ).then( (res) => {
			callback(res);
		}).catch((err)=> {
			callback(err)
		})
	},
	getLoginStatus: function (callback) {
		fetch('http://'+Globals.url+'/getLoginStatus').then( (res) => res.json() ).then( (res) => {
			callback(res);
		}).catch((err)=> {
			callback(err)
		})
	},
	logout: function (callback) {
		fetch('http://'+Globals.url+'/logout').then( (res) => res.json() ).then( (res) => {
			callback(res);
		}).catch((err)=> {
			callback(err)
		})
	},
	getMyBountyRequests: function (bountyId, callback) {
		fetch('http://'+Globals.url+'/getMyBountyRequests', {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/x-www-form-urlencoded',
		  },
		  body: Serialize({
		  	bountyId
		  })
		}).then( (res) => res.json() ).then( (res) => {
			callback(res);
		}).catch((err)=> {
			callback(err)
		})
	},
	getBounty: function (bountyId, callback) {
		fetch('http://'+Globals.url+'/getBounty', {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/x-www-form-urlencoded',
		  },
		  body: Serialize({
		  	bountyId
		  })
		}).then( (res) => res.json() ).then( (res) => {
			callback(res);
		}).catch((err)=> {
			callback(err)
		})
	},
	addBounty: function (bounty, callback) {
		var data = { 
		  	amount: parseFloat(bounty.amount),
		  	notes: bounty.notes,
		  	title: bounty.title
		}

		if ( bounty.location ) {
			data.latitude = bounty.location.latitude;
			data.longitude =  bounty.location.longitude;
		}

		fetch('http://'+Globals.url+'/addBounty', {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/x-www-form-urlencoded',
		  },
		  body: Serialize(data)
		}).then( (res) => res.json() ).then( (res) => {
			callback(res);
		}).catch((err)=> {
			callback(err)
		})
	},
	setProfilePhoto: function (imageURL, callback) {
		var obj = {
		    uploadUrl: 'http://'+Globals.url+'/setProfilePhoto',
		    method: 'POST', // default 'POST',support 'POST' and 'PUT'
		    headers: {
			    'Accept': 'application/json',
			   //  'Content-Type': "multipart/form-data"
		    },
		    files: []
		};

		if ( imageURL ) {
		  obj.files.push({
		      filepath: imageURL, // require, file absoluete path
		      filename: "image.jpg"
		  })
		}
		// console.log(events)
		FileUpload.upload(obj, (err, result) => {
		  setTimeout( () => {
		    callback(result); // result.data
		  }, 500)
		})

	},
	getBounties: function (page=1, callback) {
		fetch("http://"+ Globals.url+"/bounties").then(res=>res.json()).then(res=>{
			callback(res)
		})
	},
	requestBounty: function (bountyId) {
		fetch('http://'+Globals.url+'/requestBounty', {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/x-www-form-urlencoded',
		  },
		  body: Serialize({
		  	bountyId
		  })
		}).then( (res) => res.json() ).then( (res) => {
			callback(res);
		}).catch((err)=> {
			console.log(err)
			callback(err)
		})
	}
	
}