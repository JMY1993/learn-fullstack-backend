const express = require("express");
const { Note } = require("../model/mongo");

const noteRouter = express.Router();

noteRouter.get("/", (req, res) => {
  Note.find({}).then((r) => res.json(r));
});

noteRouter.get("/:id", (req, res) => {
  Note.findById(req.params.id).then((note) => {
    if (note) {
      res.json(note);
    } else {
      res.status(404).end();
    }
  });
});

noteRouter.post("/", (req, res) => {
  Note.create(req.body).then((note) => res.json(note));
});

noteRouter.put("/:id", (req, res) => {
  const newNote = {
    content: req.body.content,
    important: req.body.important,
  };

  Note.findByIdAndUpdate(req.params.id, newNote, { new: true }).then(
    (updatedNote) => {
      if (!updatedNote) {
        res.status(404).end();
      } else {
        res.json(updatedNote);
      }
    }
  );
});

module.exports = noteRouter;
