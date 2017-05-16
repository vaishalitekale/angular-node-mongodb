var express = require('express');
var app = express();
var url = require('url');
var async = require('async');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var fs = require('fs');
var dir = __dirname + '/media';
app.use('/static', express.static(dir));
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
var User = require('./sdk/models/Users.js');
var Reseller = require('./sdk/models/Reseller.js');
var Client = require('./sdk/models/Client.js');
var Lesson = require('./sdk/models/Lesson.js');

var moment = require('moment');
var jwt = require('jwt-simple');
var fileUpload = require('express-fileupload');
// default options
app.use(fileUpload());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

passport.serializeUser(function(user, done) {
  console.log("passport.serializeUser, user - ", user);
  // if(user){
  console.log("user.id", user.id);
  done(null, user.id);
  // } else {
  //     done('userNotFound',null);
  // }
});

var strategyOptions = {
  usernameField: 'email'
}
var loginStrategy = new LocalStrategy(strategyOptions, function(email, password, done) {
  console.log("I am in loginStrategy");
  User.findOne({
    email: email
  }, function(err, user) {
    if (err) {
      return done(err);
      // throw err;
    }
    if (!user) {
      console.log("I am in !user ");
      //These are authentication errors .. these allows to function to execute as expected
      // null is for the err and false for the user.
      return done(null, false, {
        message: 'User not registered'
      });
    }
    user.comparePasswords(password, function(err, isMatched) { // this is user defined method
      console.log("I am in compare password isMatched - ", isMatched);
      if (err) {
        return done(err);
      } else if (isMatched) { // isMatched is always send as boolean by bcrypt
        //createSendToken(user,req, res);
        console.log("if(isMatched) - ");
        return done(null, user);
      } else if (!isMatched) {
        console.log("if(!isMatched) ");
        return done(null, false, {
          message: 'Wrong password'
        });
      }
    });
    //the callback is coming from bcript library
  });
});

var registerStrategy = new LocalStrategy(strategyOptions, function(email, password, done) {
  User.findOne({
    email: email
  }, function(err, user) {
    if (err) {
      return done(err);
      // throw err;
    }
    if (user) {
      return done(null, false, {
        message: 'email already exist'
      });
    } else {
      var newUser = new User({
        email: email,
        password: password
      });
      newUser.save(function(err) {
        done(null, newUser);
      })
    }
  });

});
passport.use('local-register', registerStrategy);
passport.use('local-login', loginStrategy);


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

function checkUnauthenticatedMiddleware(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({
      message: 'You are not authorized'
    });
  } else {
    console.log("Authorization");
  }
  var token = req.headers.authorization.split(' ')[1];
  console.log("token----------------", token);
  try {
    var payload = jwt.decode(token, 'temperarySecretkey');
    if (!payload.sub) {
      res.status(401).send({
        message: 'Authentication failed'
      });
    } else {
      req.user = payload;
      console.log("payload.sub-", payload.sub);
      console.log("payload.sub-", payload.iss);
      next();
    }
  } catch (err) {
    console.log("Error during jwt.decode - ", err);
    res.status(401).send({
      message: 'session expired'
    });
  }
}

// app.get('/resellers', checkUnauthenticatedMiddleware, function(req, res) {
//     var jobs = [1, 5, 4]; //['Html boilerplate', 'AngularJs', 'Karma'];
//     res.status(200).send(jobs);
// });


app.post('/deletereseller', checkUnauthenticatedMiddleware, function(req, res) {
  console.log("Deleting reseller ", req.body);
  Reseller.remove({
    _id: req.body._id
  }, function(err) {
    if (err) {
      res.status(500).send({
        'deleted': false
      });
    } else {
      res.status(200).send({
        'deleted': true
      });
    }
  });

});


app.post('/addreseller', checkUnauthenticatedMiddleware, function(req, res) {
  console.log("files", req.files);
  //console.log("body - ", req.body);
  var reseller = JSON.parse(req.body.reseller);
  console.log("reseller - ", reseller);
  console.log("req.files----------------", req.files);

  if (reseller.editableMode) {
    // this is update reseller area
    async.waterfall([
      function(callback) {
        if (req.files && req.files.profileImage) {
          var profileImage = req.files.profileImage;
          var dir = __dirname + '/media';
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }
          var profileURL = '/' + reseller.userName + '-profile.' + req.files.profileImage.name.split('.').pop();
          profileImage.mv(__dirname + '/media' + profileURL, function(err) {
            if (err) {
              callback(err, null);
            } else {
              reseller.profileImageURL = profileURL;
              callback(null);
            }
          });
        } else {
          callback(null);
        }
      },
      function(callback) {
        if (req.files && req.files.companyLogo) {
          var companyLogo = req.files.companyLogo;
          var dir = __dirname + '/media';
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }
          var companyLogoURL = '/' + reseller.userName + '-companyLogo.' + req.files.companyLogo.name.split('.').pop();
          companyLogo.mv(__dirname + '/media' + companyLogoURL, function(err) {
            if (err) {
              callback(err, null);
            } else {
              reseller.companyLogoURL = companyLogoURL;
              callback(null);
            }
          });
        } else {
          callback(null);
        }
      },
      function(callback) {
        console.log("I am updating reseller");

        var query = {
          '_id': reseller._id
        };
        Reseller.findOneAndUpdate(query, reseller, {
          upsert: true
        }, function(err, doc) {
          if (err) {
            callback(err, null);
          } else {
            callback(null, doc);
          }
        });
      }
    ], function(err, result) {
      if (err) {
        res.status(500).send({
          updated: false,
          err: err
        });
      } else {
        res.status(200).send({
          updated: true,
          err: null
        });
      }
    });

  } else {
    /// this is create reseller function
    // reseller.parentId = req.user.sub;
    async.waterfall([
      function(callback) {
        if (reseller.userName) {
          var query = Reseller.find({
            'userName': reseller.userName
          }).select({
            "_id": 1
          });
          query.exec(function(err, user) {
            if (err) {
              callback('error during finding username', null);
            } else {
              console.log("found username with id - ", user);
              if (user.length > 0) {
                callback('username already in use', null);
              } else {
                callback(null);
              }
            }
          });
        } else {
          callback('username required', null);
        }
      },
      function(callback) {
        if (req.files && req.files.profileImage) {
          var profileImage = req.files.profileImage;
          var dir = __dirname + '/media';
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }
          var profileURL = '/' + reseller.userName + '-profile.' + req.files.profileImage.name.split('.').pop();
          console.log("__dirname - ", __dirname);
          profileImage.mv(__dirname + '/media' + profileURL, function(err) {
            if (err) {
              callback(err, null);
            } else {
              reseller.profileImageURL = profileURL;
              callback(null);
            }
          });
        } else {
          callback(null);
        }
      },
      function(callback) {
        if (req.files && req.files.companyLogo) {
          var companyLogo = req.files.companyLogo;
          var dir = __dirname + '/media';
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }
          var companyLogoURL = '/' + reseller.userName + '-companyLogo.' + req.files.companyLogo.name.split('.').pop();
          companyLogo.mv(__dirname + '/media' + companyLogoURL, function(err) {
            if (err) {
              callback(err, null);
            } else {
              reseller.companyLogoURL = companyLogoURL;
              callback(null);
            }
          });
        } else {
          callback(null);
        }
      },
      function(callback) {
        var newReseller = new Reseller(reseller);
        newReseller.save(function(err, data) {
          if (err) {
            console.log("err in saving data", err);
            callback(err, null);
            // res.status(500).send({
            //     saved: 'false'
            // });
          } else {
            console.log("data saved - ", data);
            callback(null, data);

          }
        });
      }
    ], function(err, result) {
      if (err) {
        res.status(500).send({
          saved: false,
          err: err
        });
      } else {
        res.status(200).send({
          saved: true,
          err: null
        });
      }
    });
  }
});
// });
// });

app.post('/login', function(request, response, next) {
  console.log("I am in /login", request.body);
  Reseller.findOne({
    'email': request.body.email,
    'password': request.body.password
  }, function(err, reseller) {
    console.log("Doc from reseller - ", reseller);
    if (err) {
      response.status(500).send({
        user: null,
        token: null
      });
    } else {
      // console.log(" total reseller found - ", docs.length);
      if (reseller) {
        console.log("found reseller", reseller);
        reseller.isReseller = true;
        createSendToken(reseller, request, response);
      } else {
        passport.authenticate('local-login', function(err, user, info) {
          console.log("I am in passport.authenticate");
          if (err) {
            console.log("I am in passport.authenticate err-", err);
            response.status(500).send({
              user: null,
              token: null
            });
            //next(err);
          } else if (!user) {
            console.log("I am in passport.authenticate !user info-", info);
            response.status(401).send({
              user: null,
              token: null,
              message: info
            });
          } else {
            console.log("I am in passport.authenticate user", user);
            request.logIn(user, function(err) {
              if (err) {
                return next(err);
              }
              createSendToken(request.user, request, response);
            });

          }
        })(request, response, next);
      }
    }
  });

});

app.post('/register', function(request, response, next) {
  // console.log("in resgister", request.body);
  // response.send({'register':'successfull', 'token':'123'});
  console.log("I am in /register");
  passport.authenticate('local-register', function(err, user, info) {
    console.log("I am in passport.authenticate");
    if (err) {
      console.log("I am in passport.authenticate err-", err);
      request.status(500).send({
        user: null,
        token: null
      });
      //next(err);
    } else if (!user) {
      console.log("I am in passport.authenticate !user info-", info);
      request.status(401).send({
        user: null,
        token: null,
        message: info
      });
    } else {
      console.log("I am in passport.authenticate user", user);
      request.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        createSendToken(request.user, request, response);
      });

    }
  })(request, response, next);
});


app.post('/reseller', checkUnauthenticatedMiddleware, function(request, response) {
  console.log("in post /reseller", request.body);
  let newReseller = new Reseller(request.body);

  newReseller.save(function(err, data) {
    if (err) {
      response.status(500).send({
        saved: 'false'
      });
    } else {
      console.log("Post saved", data);
      response.status(200).send({
        saved: data
      });
    }

    // done(null, newUser);
  });

});

app.get('/reseller', checkUnauthenticatedMiddleware, function(request, response) {
  var user = request.user;

  Reseller.find({}, function(err, Reseller) {
    if (err) {
      console.log("err finding resealers  - ", err);
      response.status(500).send({
        error: "error in finding resellers"
      });
    } else {

      response.status(200).send(Reseller);
    }

  });
});

app.get('//:resellerId?', checkUnauthenticatedMiddleware, function(request, response) {
  var role = request.user.role;
  var userId = request.user.sub;
  var parentId;
  if (role == 'ADMIN') {
    parentId = request.params.resellerId ? request.params.resellerId : userId;
  } else if (role == 'RESELLER') {
    parentId = userId;
  }

  Client.find({
    parentId: parentId
  }, function(err, Client) {
    if (err) {
      console.log("err finding clients  - ", err);
      response.status(500).send({
        error: "error in finding clients"
      });
    } else {
      response.status(200).send(Client);
    }
  });
});

app.post('/addclient', checkUnauthenticatedMiddleware, function(req, res) {
  console.log("files", req.files);
  //console.log("body - ", req.body);
  var client = JSON.parse(req.body.client);
  console.log("client - ", client);
  if (client.editableMode) {
    // this is update reseller area
    async.waterfall([
      function(callback) {
        if (req.files && req.files.profileImage) {
          var profileImage = req.files.profileImage;

          var dir = __dirname + '/media';
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }
          var profileURL = '/' + client.username + '-profile.' + req.files.profileImage.name.split('.').pop();
          profileImage.mv(__dirname + '/media' + profileURL, function(err) {
            if (err) {
              callback(err, null);
            } else {
              client.profileImageURL = profileURL;
              callback(null);
            }
          });
        } else {
          callback(null);
        }
      },
      function(callback) {
        if (req.files && req.files.companyLogo) {
          var companyLogo = req.files.companyLogo;
          var dir = __dirname + '/media';
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }
          var companyLogoURL = '/' + client.username + '-companyLogo.' + req.files.companyLogo.name.split('.').pop();
          companyLogo.mv(__dirname + '/media' + companyLogoURL, function(err) {
            if (err) {
              callback(err, null);
            } else {
              client.companyLogoURL = companyLogoURL;
              callback(null);
            }
          });
        } else {
          callback(null);
        }
      },
      function(callback) {
        console.log("I am updating reseller");

        var query = {
          '_id': client._id
        };
        Client.findOneAndUpdate(query, client, {
          upsert: true
        }, function(err, doc) {
          if (err) {
            callback(err, null);
          } else {
            callback(null, doc);
          }
        });
      }
    ], function(err, result) {
      if (err) {
        res.status(500).send({
          updated: false,
          err: err
        });
      } else {
        res.status(200).send({
          updated: true,
          err: null
        });
      }
    });
  } else {
    /// this is create reseller function
    async.waterfall([
      function(callback) {
        if (client.username) {
          var query = Client.find({
            'username': client.username
          }).select({
            "_id": 1
          });
          query.exec(function(err, user) {
            if (err) {
              callback('error during finding username', null);
            } else {
              console.log("found username with id - ", user);
              if (user.length > 0) {
                callback('username already in use', null);
              } else {
                callback(null);
              }
            }
          });
        } else {
          callback('username required', null);
        }
      },
      function(callback) {
        if (req.files && req.files.profileImage) {
          var profileImage = req.files.profileImage;
          var dir = __dirname + '/media';
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }
          var profileURL = '/' + client.username + '-profile.' + req.files.profileImage.name.split('.').pop();
          console.log("__dirname - ", __dirname);
          profileImage.mv(__dirname + '/media' + profileURL, function(err) {
            if (err) {
              callback(err, null);
            } else {
              client.profileImageURL = profileURL;
              callback(null);
            }
          });
        } else {
          callback(null);
        }
      },
      function(callback) {
        if (req.files && req.files.companyLogo) {
          var companyLogo = req.files.companyLogo;
          var dir = __dirname + '/media';
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }
          var companyLogoURL = '/' + client.username + '-companyLogo.' + req.files.companyLogo.name.split('.').pop();
          companyLogo.mv(__dirname + '/media' + companyLogoURL, function(err) {
            if (err) {
              callback(err, null);
            } else {
              console.log("--------------", companyLogoURL);
              client.companyLogoURL = companyLogoURL;
              callback(null);
            }
          });
        } else {
          callback(null);
        }
      },
      function(callback) {
        client.parentId = req.user.sub;
        var newClient = new Client(client);
        newClient.save(function(err, data) {
          if (err) {
            console.log("err in saving data", err);
            callback(err, null);
            // res.status(500).send({
            //     saved: 'false'
            // });
          } else {
            console.log("data saved - ", data);
            callback(null, data);

          }
        });
      }
    ], function(err, result) {
      if (err) {
        res.status(500).send({
          saved: false,
          err: err
        });
      } else {
        res.status(200).send({
          saved: true,
          err: null
        });
      }
    });
  }
});

app.delete('/deleteclient/:id', function(request, response) {
  Client.remove({
    "_id": request.params.id
  }, function(err, Client) {
    if (err) {
      console.log("err deleting clients  - ", err);
      response.status(500).send({
        error: "error in deleting clients"
      });
    } else {

      response.status(200).send(Reseller);
    }

  });
});

app.get('/search/:str/:role', checkUnauthenticatedMiddleware, function(request, response) {
  var role = request.user.role;
  var userId = request.user.sub;
  var searchForRole = request.params.role;
  var parentId;
  if (role == 'ADMIN') {
    parentId = request.params.resellerId ? request.params.resellerId : userId;
  } else if (role == 'RESELLER') {
    parentId = userId;
  }

  if (searchForRole == 'RESELLER') {

  } else if (searchForRole == 'CLIENT') {
    Client.find({
      parentId: parentId
    })
  }

  Client.find({
    parentId: parentId
  }, function(err, Client) {
    if (err) {
      console.log("err finding clients  - ", err);
      response.status(500).send({
        error: "error in finding clients"
      });
    } else {
      response.status(200).send(Client);
    }
  });

})

app.post('/lesson', checkUnauthenticatedMiddleware, function(req, res) {
  var role = req.user.role;
  var userId = req.user.sub;
  var insertData = req.body;
  insertData.created_by = userId;
  console.log(insertData);

  let newLesson = new Lesson(insertData);

  newLesson.save(function(err, data) {
    if (err) {
      res.status(500).send({
        saved: 'false'
      });
    } else {
      console.log("Lesson added", data);
      res.status(200).send({
        saved: data
      });
    }

    // done(null, newUser);
  });



})

app.get('/lesson/:page', checkUnauthenticatedMiddleware, function(req, res) {
  var role = req.user.role;
  var userId = req.user.sub;
  var page = req.params.page;

  Lesson.find({
    created_by: userId
  }, function(err, data) {
    if (err) {
      console.log("err finding lessons  - ", err);
      res.status(500).send({
        error: "error in finding lessons"
      });
    } else {
      Lesson.count({
        created_by: userId
      }, function(err, count) {
        if (err) {
          console.log("err finding lessons  - ", err);
          res.status(500).send({
            error: "error in finding lessons"
          });
        } else {
          var response = {}
          response.totalCount = count;
          response.data = data;
          res.status(200).json(response);
        }
      })
    }
  }).limit(10).skip((page - 1) * 10)


})

app.delete('/lesson/:id', function(req, res) {
  Lesson.remove({
    "_id": req.params.id
  }, function(err, result) {
    if (err) {
      console.log("err deleting lesson  - ", err);
      res.status(500).send({
        error: "error in deleting lesson"
      });
    } else {
      res.status(200).send(result);
    }

  })
})

function createSendToken(user, req, res) {
  console.log("moment time -", moment().add(10, 'days').unix());
  // lets create payload
  var payload = {
    role: user._doc.role,
    iss: req.hostname, // who issure, who created the payload
    sub: user.id, // since the subject for now is the user hence we are sending user id
    //exp: moment().add(10,'days').unix()
    exp: moment().add(1, 'day').unix()
  };
  // variable to hold our token
  var token = jwt.encode(payload, 'temperarySecretkey');

  res.status(200).send({
    user: user.toJSON(),
    token: token
  });
}

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
