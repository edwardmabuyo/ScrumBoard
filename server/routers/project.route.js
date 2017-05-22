'use strict';

function ProjectRouter (express, projectController) {
    var route = express.Router();

    route.get('/', function (req, res) {
        var query = req.query;
        console.log(query.includeDeleted);
        projectController.getProjects(query.projectId, query.includeDeleted)
            .then(function (project) {
                res.status(201).send(project);
            })
            .catch(function (error) {
                res.status(error.status || 400);
                res.send(error.message);
            });
    });

    route.post('/', function (req, res) {
        projectController.createProject(req.body.project)
            .then(function (project) {
                res.status(201).send(project);
            })
            .catch(function (error) {
                res.status(error.status || 400);
                res.send(error.message);
            });
    });

    route.put('/', function (req, res) {
        projectController.updateProject(req.body.project)
            .then(function (project) {
                res.status(201).send(project);
            })
            .catch(function (error) {
                res.status(error.status || 400);
                res.send(error.message);
            });
    });

    route.put('/projectStory', function (req, res) {
        projectController.addStory(req.body.projectId, req.body.storyId)
            .then(function (project) {
                res.status(201).send(project);
            })
            .catch(function (error) {
                res.status(error.status || 400);
                res.send(error.message);
            });
    });

    route.delete('/projectStory', function (req, res) {
        projectController.removeStory(req.body.projectId, req.body.storyId)
            .then(function (project) {
                res.status(201).send(project);
            })
            .catch(function (error) {
                res.status(error.status || 400);
                res.send(error.message);
            });
    });

    return route;
}

module.exports = ProjectRouter;