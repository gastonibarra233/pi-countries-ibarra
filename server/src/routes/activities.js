const { Router } = require("express");
const postActivity = require("../controllers/postActivity");
const deleteActivity = require("../controllers/deleteActivity");
const { Activity } = require("../db");

const router = Router();

//post
router.post("/", async (req, res) => {
  const { name, difficulty, duration, season, countryId } = req.body;
  try {
    const newActivity = await postActivity(
      name,
      difficulty,
      duration,
      season,
      countryId
    );

    return res.status(200).json(newActivity);
  } catch (error) {
    return res.status(400).send(error);
  }
});

//get
router.get("/", async (req, res) => {
  try {
    const dataActivities = await Activity.findAll();
    res.status(200).json(dataActivities);
  } catch (error) {
    return res.status(400).send(error);
  }
});

//delete
router.delete("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      return res.status(400).json({ message: "Name query parameter is required"})
    }

    const isDeleted = await deleteActivity(name);
    if (isDeleted) {
      return res.status(200).json({ message: "Activity deleted" });
    } else {
      return res.status(404).json({ message: "Activity not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error deleting activity" });
  }
});

module.exports = router;
