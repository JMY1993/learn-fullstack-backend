const express = require("express");
const morgan = require("morgan");

const noteRouter = require('./router/notesRouter');
const phonebookRouter = require("./router/phonebookRouter");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT;

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const unknownEndpoint = (request, response) => {
  console.log("Error: Unknown endpoint.");
  response.status(404).send({ error: "unknown endpoint" });
};

const app = express();

app.use(express.static("dist"), express.json());

morgan.token("req-body", (res) =>
  res.method != "GET" ? JSON.stringify(res.body) : ""
);

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);

app.use("/api/persons", phonebookRouter)

app.use('/api/notes', noteRouter);

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
