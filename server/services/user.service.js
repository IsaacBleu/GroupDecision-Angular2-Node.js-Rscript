var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');
var R = require('r-script');

var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getResult = getResult;
service.getById = getById;
service.create = create;
service.surveyA = surveyA;
service.surveyB = surveyB;
service.result = result;
service.update = update;
service.delete = _delete;

module.exports = service;

function authenticate(username, password) {
    var deferred = Q.defer();

    db.users.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve({
                _id: user._id,
                username: user.username,
                //out:user.out2,
                //alt1:user.alt1,
                //alt2:user.alt2,
                //alt3:user.alt3,
                //alt4:user.alt4,
                token: jwt.sign({ sub: user._id }, config.secret)
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();

    db.users.find().toArray(function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        });

        deferred.resolve(users);
    });

    return deferred.promise;
}

function getResult(_id,userParam) {
    var deferred = Q.defer();
    //var username = userParam.username;

    //db.users.find({},null,{limit:1}).toArray(function (err, users) {
    //db.users.findById(id,function (err, users) {
    //db.users.find({ username: 'test2' }).toArray(function (err, users) {
    db.users.find({ username: userParam.username}).toArray( function (err, users){
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        });

        deferred.resolve(users);
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');

        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);

        db.users.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function result(_id,userParam) {
    var deferred = Q.defer();
    var userlist = [userParam.user1,userParam.user2,userParam.user3];
    var out = R("C:\\Users\\ISAAC\\Desktop\\Project\\GroupDecision\\server\\proj_group_decision.R")
        .data(userlist, 20)
        .callSync();
    console.log(out);
    //return out;
    //var set = {out2:[out[0],out[1],out[2],out[3]]};

    db.users.update(
        { username: userParam.username },
        { $set: out },
        { upsert: true },
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve({
                username:userParam.username,
                //out:out,
                alt1:userParam.alt1,
                alt2:userParam.alt2,
                alt3:userParam.alt3,
                alt4:userParam.alt4,
                token: jwt.sign({ sub: userParam._id }, config.secret)
            });
        });

        //db.users.find( { username: "test" } , { out2:1} );

    return deferred.promise;
}

function surveyA(_id, userParam) {
    var deferred = Q.defer();
    //var aaa = userParam.username;
    //function createSurveyA() {
        // fields to update
        //var set = {
            //ac1g: userParam.ac1g,
            //ac1b: userParam.ac1b,
            //ac2g: userParam.ac2g,
            //ac2b: userParam.ac2b,
            //ac3g: userParam.ac3g,
            //ac3b: userParam.ac3b,
        //};
        var set = {QA: [userParam.a1c1g, userParam.a1c1b,
                        userParam.a1c2g, userParam.a1c2b,
                        userParam.a1c3g, userParam.a1c3b,
                        userParam.a1c4g, userParam.a1c4b,
                        userParam.a1c5g, userParam.a1c5b,
                        userParam.a2c1g, userParam.a2c1b,
                        userParam.a2c2g, userParam.a2c2b,
                        userParam.a2c3g, userParam.a2c3b,
                        userParam.a2c4g, userParam.a2c4b,
                        userParam.a2c5g, userParam.a2c5b,
                        userParam.a3c1g, userParam.a3c1b,
                        userParam.a3c2g, userParam.a3c2b,
                        userParam.a3c3g, userParam.a3c3b,
                        userParam.a3c4g, userParam.a3c4b,
                        userParam.a3c5g, userParam.a3c5b,
                        userParam.a4c1g, userParam.a4c1b,
                        userParam.a4c2g, userParam.a4c2b,
                        userParam.a4c3g, userParam.a4c3b,
                        userParam.a4c4g, userParam.a4c4b,
                        userParam.a4c5g, userParam.a4c5b]};

        db.users.update(
            //{ _id: mongo.helper.toObjectID(_id) },
            { username: userParam.username },
            { $set: set },
            //{ $QA: [userParam.ac1g, userParam.ac1b, userParam.ac2g, userParam.ac2b, userParam.ac3g, userParam.ac3b] },
            //{  $set:{ac1g: userParam.ac1g,ac1b: userParam.ac1b, }},
            { upsert: true },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });

    //}

    return deferred.promise;
}

function surveyB(_id, userParam) {
    var deferred = Q.defer();
    //var set = {
        //c1_c2: userParam.c1_c2,
        //c1_c3: userParam.c1_c3,
        //c1_c4: userParam.c1_c4,
        //c1_c5: userParam.c1_c5,
        //c2_c3: userParam.c2_c3,
        //c2_c4: userParam.c2_c4,
        //c2_c5: userParam.c2_c5,
        //c3_c4: userParam.c3_c4,
        //c3_c5: userParam.c3_c5,
        //c4_c5: userParam.c4_c5,
        //};
        var set = {QB : [userParam.c1_c2, userParam.c1_c3, userParam.c1_c4, userParam.c1_c5,
                         userParam.c2_c3, userParam.c2_c4, userParam.c2_c5,
                         userParam.c3_c4, userParam.c3_c5,
                         userParam.c4_c5]};

        db.users.update(
            //{ _id: mongo.helper.toObjectID(_id) },
            { username: userParam.username },
            //{ $set: [userParam.c1_c2, userParam.c1_c3, userParam.c1_c4, userParam.c1_c5, userParam.c2_c3, userParam.c2_c4, userParam.c2_c5, userParam.c3_c4, userParam.c3_c5, userParam.c4_c5] },
            { $set: set },
            { upsert: true },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });

    return deferred.promise;
}

function update(_id, userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.username !== userParam.username) {
            // username has changed so check if the new username is already taken
            db.users.findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            ac1g: userParam.ac1g,
            ac1b: userParam.ac1b,
        };

        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }

        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            { upsert: true },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.users.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

