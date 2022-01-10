const express = require('express');
const passport = require('passport');

const router = express.Router();

const controller = require("./../controllers/habitController");

router.use(passport.authenticate("jwt", { session: false }));
router.post("/createhabit", controller.createHabit);
router.get("/viewhabits", controller.viewHabits);

router.patch("/updatehabit/:id", controller.updateHabitById);
router.get("/viewhabit/:id", controller.viewHabitById);
router.delete("/deletehabit/:id", controller.deleteHabitById);

router.post("/track", controller.trackHabit);

module.exports = router;