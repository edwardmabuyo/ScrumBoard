'use strict';

function StoryRouter(express, storyController) {
    var route = express.Router();

    route.get('/', function (req, res) {
        var query = req.query;

        storyController.getStory(query.storyId, query.projectId)
            .then(function (story) {
                res.status(201).send(story);
            })
            .catch(function (error) {
                res.status(error.status || 400);
                res.send(error.message);
            });
    });

    route.post('/', function (req, res) {
        storyController.createStory(req.body.story)
            .then(function (story) {
                res.status(201).send(story);
            })
            .catch(function (error) {
                res.status(error.status || 400);
                res.send(error.message);
            });
    });

    route.put('/', function (req, res){
        storyController.updateStory(req.body.story)
            .then(function (story) {
                res.status(201).send(story);
            })
            .catch(function (error) {
                res.status(error.status || 400);
                res.send(error.message);
            });
    });

    route.put('/storyTask', function (req, res){
        storyController.addTask(req.body.storyId, req.body.taskId)
            .then(function (story) {
                res.status(201).send(story);
            })
            .catch(function (error) {
                res.status(error.status || 400);
                res.send(error.message);
            });
    });

    route.delete('/storyTask', function (req, res){
        storyController.removeTask(req.body.storyId, req.body.taskId)
            .then(function (story) {
                res.status(201).send(story);
            })
            .catch(function (error) {
                res.status(error.status || 400);
                res.send(error.message);
            });
    });

    return route;
}

module.exports = StoryRouter;