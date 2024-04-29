const express = require("express");
const { Person } = require("../model/mongo");

const phonebookRouter = express.Router();

phonebookRouter.get("/", (req, res) => {
  Person.find({}).then((r) => res.json(r));
});

phonebookRouter.get("/:id", (req, res) => {
  Person.findById(req.params.id).then((person) => {
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  });
});

phonebookRouter.post("/", (req, res) => {
  Person.create(req.body).then((person) => res.json(person));
});

phonebookRouter.put("/:id", (req, res) => {
  const newPerson= {
    content: req.body.content,
    important: req.body.important,
  };

  Person.findByIdAndUpdate(req.params.id, newPerson, { new: true }).then(
    (updatedPerson) => {
      if (!updatedPerson) {
        res.status(404).end();
      } else {
        res.json(updatedPerson);
      }
    }
  );
});

module.exports = phonebookRouter;