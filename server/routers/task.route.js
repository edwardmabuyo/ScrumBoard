'use strict';

function TaskRouter(express, taskController) {
    var route = express.Router();

    route.get('/', function (req, res) {
        var query = req.query;

        taskController.getTasks(storyId, taskId)
            .then(function (task) {
                res.status(201).send(task);
            })
            .catch(function (error) {
                res.status(error.status || 400);
                res.send(error.message);
            });
    });

    route.post('/', function (req, res) {
        taskController.createTask(req.body.task)
            .then(function (task) {
                res.status(201).send(task);
            })
            .catch(function (error) {
                res.status(error.status || 400);
                res.send(error.message);
            });
    });

    route.put('/', function (req, res){
        taskController.updateTask(req.body.task)
            .then(function (task) {
                res.status(201).send(task);
            })
            .catch(function (error) {
                res.status(error.status || 400);
                res.send(error.message);
            });
    });

    return route;
}

module.exports = TaskRouter;