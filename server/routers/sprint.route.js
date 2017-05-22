'use strict';

function SprintRouter(express) {
    var route = express.Router();

    route.get('/', function (req, res) {
        res.json({
            message: 'You are getting list of sprints'
        });
    });

    return route;
}

module.exports = SprintRouter;