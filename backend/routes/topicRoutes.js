import express from "express";
import Topic from "../models/Topic.js";

const router = express.Router();

// GET all topics
router.get("/", async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE topic
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const topic = new Topic({ name });
    await topic.save();
    res.status(201).json(topic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE topic
router.put("/:id", async (req, res) => {
  try {
    const updatedTopic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTopic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE topic
router.delete("/:id", async (req, res) => {
  try {
    await Topic.findByIdAndDelete(req.params.id);
    res.json({ message: "Topic deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
