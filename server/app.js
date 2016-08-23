'use strict';

function restAppServer(config, server) {
    const express = require('express');
    const bodyParser = require('body-parser');

    const mongooseInstance = require('./providers/mongoose')(config.mongo);
    const models = require('./models');
    const controllers = require('./controllers');
    const routers = require('./routers');

    const app = express();
    app.use(bodyParser.json());

    const projectController = new controllers.ProjectController(models.Project);
    const userController = new controllers.UserController(models.User);
    const storyController = new controllers.StoryController(models.Story);
    const taskController = new controllers.TaskController(models.Task);
    const sprintController = new controllers.SprintController(models.Sprint);

    const projectRouter = routers.ProjectRouter(express, projectController);
    const userRouter = routers.UserRouter(express, userController);
    const storyRouter = routers.StoryRouter(express, storyController);
    const taskRouter = routers.TaskRouter(express, taskController);
    const sprintRouter = routers.SprintRouter(express, sprintController);



    //Routers
    app.get('/', function helloWorldEndpoint(req, res) {
        res.send('Aloha!');
    });
    app.use('/project', projectRouter);
    app.use('/user', userRouter);
    app.use('/story', storyRouter);
    app.use('/task', taskRouter);
    app.use('/sprint', sprintRouter);


    server.on('request', app);
    return app;
}

module.exports = restAppServer;