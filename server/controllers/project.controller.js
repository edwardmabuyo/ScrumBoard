'use strict';
const mongoose = require('mongoose');

function ProjectController (Project) {

    function createProject(newProject) {
        var project = new Project();
        if (!mongoose.Types.ObjectId.isValid(newProject.createdBy)){
                throw Error('Invalid user id');
        };
        project.createdBy = mongoose.Types.ObjectId(newProject.createdBy);
        project.name = newProject.name;
        project.description = newProject.description;

        return project.save()
            .then((savedProject) => {
                return Project.findOne({_id: savedProject._id}, {
                    name: 1,
                    description: 1,
                    createdBy: 1,
                    createdDate: 1,
                    stories: 1,
                    isDeleted: 1
                })
                .populate('createdBy', 'firstName lastName email')
                .populate('stories')
                .exec();
            })
            .catch((error) => {
                throw error;
            });
    }

    function getProjects(projectId, includeDeleted){
        var condition = {};
        if (projectId) {
            if (!mongoose.Types.ObjectId.isValid(projectId)){
                throw Error('Invalid projectId');
            };

            condition._id = mongoose.Types.ObjectId(projectId);
        }

        if (!includeDeleted) {
            condition.isDeleted = false;
        }

        return Project.find(condition, {
                    name: 1,
                    description: 1,
                    createdBy: 1,
                    createdDate: 1,
                    stories: 1,
                    isDeleted: 1
                })
                .populate('createdBy', 'firstName lastName email')
                .populate('stories')
                .exec();
    }

    function addStory(projectId, storyId) {
        return new Promise(function (resolve, reject) {
            var condition = {_id: projectId};

            return Project.findOne(condition, function (error, project) {
                if (error) {
                    return reject(error);
                }

                if (!project) {
                    return reject({status: 404, message: 'Project not found'});
                }

                var inArray = project.stories.some(function(story) {
                    return (story) ? story.equals(storyId) : false;
                });

                if (!inArray) {
                    project.stories.push(storyId);
                }

                return resolve(project);
            });
        })
        .then(function (project) {
            return project.save()
                .then(function (updatedProject) {
                    return Project.findOne({_id: updatedProject._id},
                    {
                        name: 1,
                        description: 1,
                        createdBy: 1,
                        createdDate: 1,
                        stories: 1,
                        isDeleted: 1
                    })
                    .populate('createdBy', 'firstName lastName email')
                    .populate('stories')
                    .exec();
                });
        }).catch(function (error) {
            throw(error);
        });
    }

    function removeStory(projectId, storyId) {
        return new Promise(function (resolve, reject) {
            var condition = {_id: projectId};

            return Project.findOne(condition, function (error, project) {
                if (error) {
                    return reject(error);
                }

                if (!project) {
                    return reject({status: 404, message: 'Project not found'});
                }

                var index = project.stories.indexOf(storyId);

                if (index > -1) {
                    project.stories.splice(index, 1);
                }

                return resolve(project);
            });
        })
        .then(function (project) {
            return project.save()
                .then(function (updatedProject) {
                    return Project.findOne({_id: updatedProject._id},
                    {
                        name: 1,
                        description: 1,
                        createdBy: 1,
                        createdDate: 1,
                        stories: 1,
                        isDeleted: 1
                    })
                    .populate('createdBy', 'firstName lastName email')
                    .populate('stories')
                    .exec();
                });
        }).catch(function (error) {
            throw(error);
        });
    }

    function updateProject(updatedProject) {
        return new Promise(function (resolve, reject) {
            var condition = { _id: updatedProject._id };

            return Project.findOne(condition, function (error, project) {
                if (error) {
                    return reject(error);
                }

                if (!project) {
                    return reject({status: 404, message: 'Project not found'});
                }

                project.name = updatedProject.name;
                project.description = updatedProject.description;
                project.isDeleted = updatedProject.isDeleted;

                return resolve(project);
            });
        })
        .then(function (project) {
            return project.save()
                .then(function (updatedProject) {
                    return Project.findOne({_id: updatedProject._id },
                    {
                        name: 1,
                        description: 1,
                        createdBy: 1,
                        createdDate: 1,
                        stories: 1,
                        isDeleted: 1
                    })
                    .populate('createdBy', 'firstName lastName email')
                    .populate('stories')
                    .exec();
                });
        }).catch(function (error) {
            throw(error);
        });
    }

    this.createProject = createProject;
    this.getProjects = getProjects;
    this.addStory = addStory;
    this.removeStory = removeStory;
    this.updateProject = updateProject;
}


module.exports = ProjectController;
