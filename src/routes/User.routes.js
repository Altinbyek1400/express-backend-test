let express = require('express');
let router = express.Router();
const UserController = require('../controllers/User.controller');

router.get('/list', UserController.getAllUser);

module.exports = router;
