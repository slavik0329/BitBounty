var multer          =       require('multer');
var upload      =   multer({ dest: './uploads/'});
var Bounty            = require('./models/bounty');
var User            = require('./models/user');

var easyimg = require('easyimage');


module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    // app.get('/', function(req, res) {
    //     res.render('index.ejs'); // load the index.ejs file
    // });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form

    app.get('/images/:file',function(req,res){
        res.sendFile(req.params.file,  {root: './uploads'});
    });

    app.post('/login', function (req, res, next) { 
        passport.authenticate('local-login', function (err, user, info) {
            if ( !user ) {
                res.json({
                    error: info.error
                })
            } else {
                req.logIn(user, function(err) {
                    res.json({
                        status: "ok",
                        user: user
                    })
                });
            }
        })(req, res, next);
    });


    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================

    // app.post('/signup', passport.authenticate('local-signup', {
    //     successRedirect : '/loggedIn', // redirect to the secure profile section
    //     failureRedirect : '/loginFail', // redirect back to the signup page if there is an error
    // }));

    app.post('/signup', function (req, res, next) { 
        passport.authenticate('local-signup', function (err, user, info) {
            if ( !user ) {
                res.json({
                    error: info.error
                })
            } else {
                req.logIn(user, function(err) {
                    res.json({
                        status: "ok",
                        user: user
                    })
                });
            }
        })(req, res, next);
    });

    app.get('/getLoginStatus', function (req, res, next) { 
        if (req.isAuthenticated())
        {
            res.json({
                loggedIn: true,
                user: req.user
            })
        } else {
            res.json({
                loggedIn: false,
            })
        }
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        console.log(res.user)
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.json({
            status: "ok"
        })
    });

    app.get('/bounties', function(req, res) {

        Bounty.find({}, null, {

        }).sort({
            time: -1
        }).exec(function (err,bounties) {

            var userIds = bounties.map(function (bounty) {
                return bounty.userId;
            })

            getImagesForIds(userIds, function (userImages) {
                res.json({
                    bounties: bounties,
                    userImages: userImages
                })
            })
           
        });

        
    });

    app.post('/setProfilePhoto', upload.any(), isLoggedIn,  function(req, res) {
 

            if ( req.files.length ) {
                var dest = req.files[0].path.split("/")[1].split(".")[0] + "_resized.jpg";

                easyimg.resize({
                  src:"uploads/"+req.files[0].path.split("/")[1], 
                  dst: 'uploads/'+dest, 
                  width:1080, 
                  height:1920
                }).then(function (file) {

                    req.user.image = dest;
                    req.user.save();
                    
                    res.json({ok:true})
                    
                });
            }

        });


    // app.post('/addFeedEvent', upload.any(), isLoggedIn,  function(req, res) {
    //     // console.log(req.body)
    //     // console.log(req.params)
    //     // console.log(req.body)


    //     var feedEvent = new FeedEvent();

    //     feedEvent.meals = req.body.meals;
    //     feedEvent.userId = req.body.userId;
    //     feedEvent.username = req.user.local.username;
    //     feedEvent.note = req.body.note;
    //     feedEvent.location = JSON.parse(req.body.location);
    //     feedEvent.time = Date.now();
    //     feedEvent.userId = req.user._id;

    //     if ( req.files.length ) {
    //         var dest = req.files[0].path.split("/")[1].split(".")[0] + "_resized.jpg";

    //         easyimg.resize({
    //           src:"uploads/"+req.files[0].path.split("/")[1], 
    //           dst: 'uploads/'+dest, 
    //           width:1080, 
    //           height:1920
    //         }).then(function (file) {

    //             // set the user's local credentials
    //             feedEvent.image = dest;

    //             // save the user
    //             feedEvent.save(function(err) {
    //                 if (err)
    //                     throw err;
    //             });
                
    //             console.log(req.body)
    //             res.json({ok:true})
                
    //         });
    //     } else {
    //         feedEvent.save(function(err) {
    //             if (err)
    //                 throw err;

    //             res.json({ok:true})

    //         });
    //     }

    // });

    app.post('/setusername', isLoggedIn,  function(req, res) {
        var username = req.body.username.trim();

        // FeedEvent.update({
        //     userId:req.user._id
        // }, {
        //     $set:{
        //         username:username
        //     }
        // },{
        //     multi: true
        // }, function (err, other) {
        // })

        User.findOne({
            "local.username": { $regex: new RegExp("^" + username.toLowerCase(), "i") }
        }, function (err, user) {
            if (user) {
                res.json({
                    error: "Username is already in use!"
                })
            } else {

                req.user.local.username = username;
                req.user.save();
                res.json({
                    ok: true
                })
            }
        })
        

        
    });

    app.post('/addBounty', isLoggedIn,  function(req, res) {
        var bounty = new Bounty();
        
        bounty.location = {
            latitude: req.body.latitude,
            longitude: req.body.longitude
        };

        bounty.amount = req.body.amount;
        bounty.notes = req.body.notes;
        bounty.title = req.body.title;
        bounty.userId = req.user._id;
        bounty.username = req.user.local.username;

        bounty.save((bounty)=> {
            res.json(bounty)

        });
        
    });



};

function getImagesForIds (userIds, callback) {
    User.find({
        _id: {
            $in: userIds
        }
    }, "image", function (err, users) {
        callback(users);
    })
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    console.log("not authed")
    // if they aren't redirect them to the home page
}