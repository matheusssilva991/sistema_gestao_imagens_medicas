const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const databaseRoutes = require("./databaseRoutes");
const imageTypeRoutes = require("./imageTypeRoutes");
const solicitationRoutes = require("./solicitationRoutes");

router.use("/", userRoutes);
router.use("/", authRoutes);
router.use("/", databaseRoutes);
router.use("/", imageTypeRoutes);
router.use("/", solicitationRoutes);

module.exports = router;
