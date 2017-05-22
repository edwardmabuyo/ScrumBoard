'use strict';
const mongoose = require('mongoose');

function StoryController (Story) {

    function createStory(newStory) {
        var story = new Story();
        if (!mongoose.Types.ObjectId.isValid(newStory.project)){
                throw Error('Invalid project id');
        };
        if (!mongoose.Types.ObjectId.isValid(newStory.createdBy)){
                throw Error('Invalid user id');
        };
        story.project = mongoose.Types.ObjectId(newStory.project);
        story.title = newStory.title;
        story.description = newStory.description;
        story.createdBy = mongoose.Types.ObjectId(newStory.createdBy);
        story.point = newStory.point;

        return Story.findOne({project : newStory.project})
            .sort('-number')
            .exec(function(error, lastStory) {
                if (error) {
                    throw(error);
                }

                if (!lastStory) {
                    story.number = 1;
                } else {
                    story.number = lastStory.number + 1;
                }
                return story;
            }).then(function () {
                console.log(story);
                return story.save()
                    .then((savedStory) => {
                        return Story.findOne({_id: savedStory._id}, {
                            project: 1,
                            number: 1,
                            title: 1,
                            description: 1,
                            createdBy: 1,
                            createdDate: 1,
                            point: 1,
                            task: 1
                        })
                        .populate('project')
                        .populate('createdBy', 'firstName lastName email')
                        .populate('task')
                        .exec();
                    });
            })
            .catch((error) => {
                throw error;
            });
    }

    function getStory(storyId, projectId) {
        var condition = {};
        if (storyId) {
            if (!mongoose.Types.ObjectId.isValid(storyId)){
                throw Error('Invalid storyId');
            };
            condition._id = mongoose.Types.ObjectId(storyId);
        }
        if (projectId) {
            if (!mongoose.Types.ObjectId.isValid(projectId)){
                throw Error('Invalid projectId');
            };
            condition.project = mongoose.Types.ObjectId(projectId);
        }

        return Story.find(condition, {
            project: 1,
            number: 1,
            title: 1,
            description: 1,
            createdBy: 1,
            createdDate: 1,
            point: 1,
            task: 1
        })
        .populate('project')
        .populate('createdBy', 'firstName lastName email')
        .populate('task')
        .exec();
    }

    function updateStory(updatedStory) {
        return new Promise(function (resolve, reject) {
            var condition = { _id: updatedStory._id };

            return Story.findOne(condition, function (error, story) {
                if (error) {
                    return reject(error);
                }

                if (!story) {
                    return reject({status: 404, message: 'Story not found'});
                }

                story.title = updatedStory.title;
                story.description = updatedStory.description;
                story.point = updatedStory.point;

                return resolve(story);
            });
        })
        .then(function (story) {
            return story.save()
                .then(function (updatedStory) {
                    return Story.findOne({_id: updatedStory._id}, {
                        project: 1,
                        number: 1,
                        title: 1,
                        description: 1,
                        createdBy: 1,
                        createdDate: 1,
                        point: 1,
                        task: 1
                    })
                    .populate('project')
                    .populate('createdBy', 'firstName lastName email')
                    .populate('task')
                    .exec();
                });
        }).catch(function (error) {
            throw(error);
        });
    }

    function addTask(storyId, taskId) {
        return new Promise(function (resolve, reject) {
            var condition = {_id: storyId};

            return Story.findOne(condition, function (error, story) {
                if (error) {
                    return reject(error);
                }

                if (!story) {
                    return reject({status: 404, message: 'Story not found'});
                }

                var inArray = story.task.some(function(itemTask) {
                    return (itemTask) ? itemTask.equals(taskId) : false;
                });

                if (!inArray) {
                    story.task.push(taskId);
                }

                return resolve(story);
            });
        })
        .then(function (story) {
            return story.save()
                .then(function (updatedStory) {
                    return Story.findOne({_id: updatedStory._id}, {
                        project: 1,
                        number: 1,
                        title: 1,
                        description: 1,
                        createdBy: 1,
                        createdDate: 1,
                        point: 1,
                        task: 1
                    })
                    .populate('project')
                    .populate('createdBy', 'firstName lastName email')
                    .populate('task')
                    .exec();
                });
        }).catch(function (error) {
            throw(error);
        });
    }

    function removeTask(storyId, taskId) {
        return new Promise(function (resolve, reject) {
            var condition = {_id: storyId};

            return Story.findOne(condition, function (error, story) {
                if (error) {
                    return reject(error);
                }

                if (!story) {
                    return reject({status: 404, message: 'Story not found'});
                }

                var index = story.task.indexOf(taskId);

                if (index > -1) {
                    story.task.splice(index, 1);
                }

                return resolve(story);
            });
        })
        .then(function (story) {
            return story.save()
                .then(function (updatedStory) {
                    return Story.findOne({_id: updatedStory._id}, {
                        project: 1,
                        number: 1,
                        title: 1,
                        description: 1,
                        createdBy: 1,
                        createdDate: 1,
                        point: 1,
                        task: 1
                    })
                    .populate('project')
                    .populate('createdBy', 'firstName lastName email')
                    .populate('task')
                    .exec();
                });
        }).catch(function (error) {
            throw(error);
        });
    }

    this.createStory = createStory;
    this.getStory = getStory;
    this.updateStory = updateStory;
    this.addTask = addTask;
    this.removeTask = removeTask;

}


module.exports = StoryController;
