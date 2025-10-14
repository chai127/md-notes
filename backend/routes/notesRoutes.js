import express from "express";
import mongoose from "mongoose";
import Note from "../models/Note.js";

const router = express.Router();

// GET all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET notes by topic
router.get("/topic/:topicId", async (req, res) => {
  const { topicId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(topicId)) {
    return res.status(400).json({ error: "Invalid topicId" });
  }

  try {
    const notes = await Note.find({ topicId });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// GET single note
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.json(note);
  } catch (err) {
    res.status(404).json({ error: "Note not found" });
  }
});

// CREATE note
router.post("/", async (req, res) => {
  try {
    const { topicId, content } = req.body;

    if (!topicId || !mongoose.Types.ObjectId.isValid(topicId)) {
      return res.status(400).json({ error: "Valid topicId is required" });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({ error: "Note content cannot be empty" });
    }

    // Check if topic exists
    const Topic = mongoose.model("Topic");
    const topic = await Topic.findById(topicId);
    if (!topic) return res.status(400).json({ error: "Topic does not exist" });

    // Create note
    const note = new Note({ topicId, content: content.trim() });
    const savedNote = await note.save();

    res.status(201).json(savedNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create note", details: err.message });
  }
});


// UPDATE note
router.put("/:id", async (req, res) => {
  try {
    const { content, topicId } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ error: "Note content cannot be empty" });
    }

    if (!topicId || !mongoose.Types.ObjectId.isValid(topicId)) {
      return res.status(400).json({ error: "Valid topicId is required" });
    }

    const Topic = mongoose.model("Topic");
    const topicExists = await Topic.findById(topicId);
    if (!topicExists) return res.status(400).json({ error: "Topic does not exist" });

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { content: content.trim(), topicId },
      { new: true }
    );

    if (!updatedNote) return res.status(404).json({ error: "Note not found" });

    res.json(updatedNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// DELETE note
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
