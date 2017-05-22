'use strict';
const mongoose = require('mongoose');

function TaskController (Task) {

    function createTask(newTask) {
        var task = new Task();
        if (!mongoose.Types.ObjectId.isValid(newTask.project)){
                throw Error('Invalid project id');
        };
        if (!mongoose.Types.ObjectId.isValid(newTask.story)){
                throw Error('Invalid story id');
        };
        if (!mongoose.Types.ObjectId.isValid(newTask.createdBy)){
                throw Error('Invalid user id');
        };
        task.project = mongoose.Types.ObjectId(newTask.project);
        task.story = mongoose.Types.ObjectId(newTask.story);
        task.title = newTask.title;
        task.description = newTask.description;
        if (newTask.status) {
            task.status = newTask.status;
        }
        task.createdBy = newTask.createdBy;
        task.estimatedHours = newTask.estimatedHours;
        if (newTask.assignedTo && mongoose.Types.ObjectId.isValid(newTask.assignedTo)) {
            task.assignedTo = mongoose.Types.ObjectId(newTask.assignedTo);
        }

        return Task.findOne({project : newTask.project})
            .sort('-number')
            .exec(function(error, lastTask) {
                if (error) {
                    throw(error);
                }

                if (!lastTask) {
                    task.number = 1;
                } else {
                    task.number = lastTask.number + 1;
                }
                return task;
            }).then(function () {
                return task.save()
                    .then((savedTask) => {
                        return Task.findOne({_id: savedTask._id}, {
                            project: 1,
                            story: 1,
                            number: 1,
                            title: 1,
                            description: 1,
                            status: 1,
                            createdBy: 1,
                            createdDate: 1,
                            isDeleted: 1,
                            estimatedHours: 1,
                            actualHours: 1,
                            assignedTo: 1,
                            modifiedBy: 1,
                            modifiedDate: 1
                        })
                        .populate('story')
                        .populate('createdBy', 'firstName lastName email')
                        .populate('assignedTo', 'firstName lastName email')
                        .populate('modifiedBy', 'firstName lastName email')
                        .exec();
                    });
            })
            .catch((error) => {
                throw error;
            });
    }

    function getTasks(taskId, storyId, projectId, includeDeleted){
        var condition = {};
        if (taskId) {
            if (!mongoose.Types.ObjectId.isValid(taskId)){
                throw Error('Invalid taskId');
            };
            condition._id = mongoose.Types.ObjectId(taskId);
        }

        if (storyId) {
            if (!mongoose.Types.ObjectId.isValid(storyId)){
                throw Error('Invalid storyId');
            };

            condition.project = mongoose.Types.ObjectId(storyId);
        }

        if (projectId) {
            if (!mongoose.Types.ObjectId.isValid(projectId)){
                throw Error('Invalid projectId');
            };

            condition.project = mongoose.Types.ObjectId(projectId);
        }

        if (!includeDeleted) {
            condition.isDeleted = false;
        }

        return Task.find(condition, {
                    project: 1,
                    story: 1,
                    number: 1,
                    title: 1,
                    description: 1,
                    status: 1,
                    createdBy: 1,
                    createdDate: 1,
                    isDeleted: 1,
                    estimatedHours: 1,
                    actualHours: 1,
                    assignedTo: 1,
                    modifiedBy: 1,
                    modifiedDate: 1
                })
                .populate('story')
                .populate('createdBy', 'firstName lastName email')
                .populate('assignedTo', 'firstName lastName email')
                .populate('modifiedBy', 'firstName lastName email')
                .exec();
    }

    function updateTask(updatedTask) {
        return new Promise(function (resolve, reject) {
            var condition = { _id: updatedTask._id };

            return Task.findOne(condition, function (error, task) {
                if (error) {
                    return reject(error);
                }

                if (!story) {
                    return reject({status: 404, message: 'Task not found'});
                }

                task.title = updatedTask.title;
                task.description = updatedTask.description;
                task.status = updatedTask.status;
                task.estimatedHours = updatedTask.estimatedHours;
                task.actualHours = updatedTask.actualHours;
                if (assignedTo && mongoose.Types.ObjectId.isValid(updatedTask.assignedTo)) {
                    task.assignedTo = mongoose.Types.ObjectId(updatedTask.assignedTo);
                }

                return resolve(task);
            });
        })
        .then(function (task) {
            return task.save()
                .then(function (updatedTask) {
                    return Task.findOne({_id: updatedTask._id}, {
                        project: 1,
                        story: 1,
                        number: 1,
                        title: 1,
                        description: 1,
                        status: 1,
                        createdBy: 1,
                        createdDate: 1,
                        isDeleted: 1,
                        estimatedHours: 1,
                        actualHours: 1,
                        assignedTo: 1,
                        modifiedBy: 1,
                        modifiedDate: 1
                    })
                    .populate('story')
                    .populate('createdBy', 'firstName lastName email')
                    .populate('assignedTo', 'firstName lastName email')
                    .populate('modifiedBy', 'firstName lastName email')
                    .exec();
            });
        }).catch(function (error) {
            throw(error);
        });
    }

    function moveTaskToStory(taskId, storyId) {
        if (!mongoose.Types.ObjectId.isValid(storyId)){
                throw Error('Invalid story id');
        };

        return new Promise(function (resolve, reject) {
            var condition = { _id: taskId };

            return Task.findOne(condition, function (error, task) {
                if (error) {
                    return reject(error);
                }

                if (!story) {
                    return reject({status: 404, message: 'Task not found'});
                }

                task.storyId = storyId;
                return resolve(task);
            });
        })
        .then(function (task) {
            return task.save()
                .then(function (updatedTask) {
                    return Task.findOne({_id: updatedTask._id}, {
                        project: 1,
                        story: 1,
                        number: 1,
                        title: 1,
                        description: 1,
                        status: 1,
                        createdBy: 1,
                        createdDate: 1,
                        isDeleted: 1,
                        estimatedHours: 1,
                        actualHours: 1,
                        assignedTo: 1,
                        modifiedBy: 1,
                        modifiedDate: 1
                    })
                    .populate('story')
                    .populate('createdBy', 'firstName lastName email')
                    .populate('assignedTo', 'firstName lastName email')
                    .populate('modifiedBy', 'firstName lastName email')
                    .exec();
            });
        }).catch(function (error) {
            throw(error);
        });
    }

    this.getTasks = getTasks;
    this.createTask = createTask;
    this.updatedTask = updateTask;
    this.moveTaskToStory = moveTaskToStory;

}


module.exports = TaskController;
