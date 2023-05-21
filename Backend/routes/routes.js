const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const databaseRoutes = require("./databaseRoutes");
const imageRoutes = require("./imageRoutes");
const imageTypeRoutes = require("./imageTypeRoutes");
const solicitationRoutes = require("./solicitationRoutes");

router.use("/", userRoutes);
router.use("/", authRoutes);
router.use("/", databaseRoutes);
router.use("/", imageRoutes);
router.use("/", imageTypeRoutes);
router.use("/", solicitationRoutes);

module.exports = router;
