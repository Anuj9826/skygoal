const express = require('express');
const { createUser, loginUser, getUserProfile, processUserProfileRequests, updateUser } = require('../controller/userController');
const { authentication, authorization } = require('../middleware/auth');
const router = express.Router();

router.post('/register', createUser)
router.post('/login', loginUser)
router.get("/:userId/profile", authentication, authorization, getUserProfile)
router.put("/:userId/profile",authentication, authorization, processUserProfileRequests, updateUser)

//Validating the endpoint
router.all("/*", function (req, res) {
    return res
    .status(404)
    .send({ status: false, message: "Page Not Found" });
});

module.exports = router;