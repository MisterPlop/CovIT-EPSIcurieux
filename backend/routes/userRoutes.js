const express = require('express');
const router = express.Router();
const { getUsers, createUser, testUser } = require('../controllers/userControllers.js');

router.get('/getusers', getUsers);
router.post('/creatuser', createUser);
router.get('/test', testUser);
module.exports = router;
