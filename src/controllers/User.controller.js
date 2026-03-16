let UserService = require('../services/getAllUser.service');

exports.getAllUser = (req, res) => {
    UserService.getAllUserService().then((users) => {
        res.json(users);
    }).catch((err) => {
        console.log(err);
    })
}