var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.post('/surveyA', surveyA);
router.post('/surveyB', surveyB);
//router.put('/:_id', surveyA);
//router.put('/:_id', surveyB);
router.post('/result', result);
router.post('/result2', getResult);
router.get('/', getAll);
router.get('/current', getCurrent);
//router.put('/:_id', update);
router.delete('/:_id', _delete);

module.exports = router;

function authenticate(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then(function (user) {
            if (user) {
                // authentication successful
                res.send(user);
            } else {
                // authentication failed
                res.status(401).send('Username or password is incorrect');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function register(req, res) {
    userService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function result(req, res) {
    /*userService.result(req.params.username,req.body, function(err, out) {
      console.log(out);
        if (err)
            res.status(400).send(err);
            res.sendStatus(200);
            res.send(out);
    })*/
    userService.result(req.params.username,req.body)
        .then(function () {
            res.sendStatus(200);
            res.send(out);

        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function surveyA(req, res) {
    userService.surveyA(req.params.username, req.body)
        .then(function () {
            res.sendStatus(200);
            console.log(req.params.username,req.body);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function surveyB(req, res) {
    userService.surveyB(req.params.username, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    userService.getAll()
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getResult(req, res) {
    //userService.getAll(req.params._id)
    userService.getResult(req.params.username, req.body)
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrent(req, res) {
    userService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    userService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    userService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
