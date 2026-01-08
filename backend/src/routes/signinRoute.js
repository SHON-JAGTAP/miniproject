const express = require('express');
const router = express.Router();

const signinController = require('../controllers/signincontroller');

// POST /api/signin - authenticate user
router.post('/', signinController.createSigninUser);

// GET /api/signin/logout - logout user
//router.get('/logout', signinController.logoutUser);

module.exports = router;
