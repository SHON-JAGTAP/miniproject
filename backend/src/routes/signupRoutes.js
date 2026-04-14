const express = require('express');
const router = express.Router();

const signupController = require('../controllers/signupcontroller');

// POST /api/signup to register user
router.post('/', signupController.createSignupUser);

// GET /api/signup/:id to get user by ID
router.get('/:id', signupController.getUser);

module.exports = router;
