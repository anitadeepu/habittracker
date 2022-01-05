const express = require('express');
const passport = require('passport');

const router = express.Router();

const controller = require("./../controllers/userController");

router.post("/signup", controller.signupUser);
router.post("/signin", controller.signinUser);

router.get("/logout", controller.logout);
router.use(passport.authenticate("jwt", {session: false}));


module.exports = router;