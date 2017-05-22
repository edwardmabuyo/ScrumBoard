'use strict';
const mongoose = require('mongoose');

function UserController (User) {

    function getUsers(email, projectId){
        var condition = {};
        if (email) {
            condition.email = email;
        }
        if (projectId) {
             if (!mongoose.Types.ObjectId.isValid(projectId)){
                throw Error('Invalid projectId');
            };

            condition.projects = {
                $in: [mongoose.Types.ObjectId(projectId)]
            };
        }

        return User.find(condition, {
                    email: 1,
                    firstName: 1,
                    lastName: 1,
                    role: 1,
                    projects: 1
                })
                .populate('projects')
                .exec();
    }

    function createUser(newUser) {
        var user = new User();
        user.email = newUser.email;
        user.firstName = newUser.firstName;
        user.lastName = newUser.lastName;
        user.password = newUser.password;
        user.role = newUser.role;

        return user.save()
            .then((savedUser) => {
                return User.findOne({email: savedUser.email}, {
                    email: 1,
                    firstName: 1,
                    lastName: 1,
                    role: 1,
                    projects: 1
                })
                .populate('projects')
                .exec();
            })
            .catch((error) => {
                throw error;
            });
    }

    function addToProject(user, projectId) {
        return new Promise(function (resolve, reject) {
            var condition = {email: user.email};

            return User.findOne(condition, function (error, user) {
                if (error) {
                    return reject(error);
                }

                if (!user) {
                    return reject({status: 404, message: 'User not found'});
                }

                var inArray = user.projects.some(function(project) {
                    return (project) ? project.equals(projectId) : false;
                });

                if (!inArray) {
                    user.projects.push(projectId);
                }

                return resolve(user);
            });
        })
        .then(function (user) {
            console.log(user);
            return user.save()
                .then(function (updatedUser) {
                    return User.findOne({email: updatedUser.email},
                    {
                        email: 1,
                        firstName: 1,
                        lastName: 1,
                        role: 1,
                        projects: 1
                    })
                    .populate('projects')
                    .exec();
                });
        }).catch(function (error) {
            throw(error);
        });
    }

    function deleteToProject(user, projectId) {
        return new Promise(function (resolve, reject) {
            var condition = {email: user.email};

            return User.findOne(condition, function (error, user) {
                if (error) {
                    return reject(error);
                }

                if (!user) {
                    return reject({status: 404, message: 'User not found'});
                }

                var index = user.projects.indexOf(projectId);

                if (index > -1) {
                    user.projects.splice(index, 1);
                }

                return resolve(user);
            });
        })
        .then(function (user) {
            return user.save()
                .then(function (updatedUser) {
                    return User.findOne({email: updatedUser.email},
                    {
                        email: 1,
                        firstName: 1,
                        lastName: 1,
                        role: 1,
                        projects: 1
                    })
                    .populate('projects')
                    .exec();
                });
        }).catch(function (error) {
            throw(error);
        });
    }

    function updateUser(updatedUser) {
        return new Promise(function (resolve, reject) {
            var condition = { email: updatedUser.email };

            return User.findOne(condition, function (error, user) {
                if (error) {
                    return reject(error);
                }

                if (!user) {
                    return reject({status: 404, message: 'User not found'});
                }

                user.firstName = updatedUser.firstName;
                user.lastName = updatedUser.lastName;
                user.role = updatedUser.role;
                user.project = user.project;
                user.password = user.password;
                if (updatedUser.password) {
                    user.password = updatedUser.password;
                }

                return resolve(user);
            });
        })
        .then(function (user) {
            console.log(user);
            return user.save()
                .then(function (updatedUser) {
                    return User.findOne({email: updatedUser.email},
                    {
                        email: 1,
                        firstName: 1,
                        lastName: 1,
                        role: 1,
                        projects: 1
                    })
                    .populate('projects')
                    .exec();
                });
        }).catch(function (error) {
            throw(error);
        });
    }

    this.getUsers = getUsers;
    this.createUser = createUser;
    this.addToProject = addToProject;
    this.deleteToProject = deleteToProject;
    this.updateUser = updateUser;
}


module.exports = UserController;
