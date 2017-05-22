'use strict';

function UserRouter(express, userController) {
    var route = express.Router();

    route.get('/', function (req, res) {
        var query = req.query;

        userController.getUsers(query.email, query.projectId)
            .then(function (user) {
                res.status(201).send(user);
            })
            .catch(function (error) {
                res.status(error.status || 400);
                res.send(error.message);
            });
    });

    route.post('/', function (req, res) {
        userController.createUser(req.body.user)
            .then(function (user) {
                res.status(201).send(user);
            })
            .catch(function (error) {
                res.status(error.status || 400);
                res.send(error.message);
            });
    });

    route.put('/', function (req, res){
        userController.updateUser(req.body.user)
            .then(function (user) {
                res.status(201).send(user);
            })
            .catch(function (error) {
                res.status(error.status || 400);
                res.send(error.message);
            });
    });

    route.put('/UserToProject', function (req, res){
        userController.addToProject(req.body.user, req.body.projectId)
            .then(function (user) {
                res.status(201).send(user);
            })
            .catch(function (error) {
                res.status(error.status || 400);
                res.send(error.message);
            });
    });

    route.delete('/UserToProject', function (req, res){
        userController.deleteToProject(req.body.user, req.body.projectId)
            .then(function (user) {
                res.status(201).send(user);
            })
            .catch(function (error) {
                res.status(error.status || 400);
                res.send(error.message);
            });
    });

    return route;
}

module.exports = UserRouter;