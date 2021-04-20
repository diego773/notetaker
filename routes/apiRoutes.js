// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.

const router = require("express").Router();

router.get("/notes", (req, res) => {
  let notesData = [
    {
      title: "Test Title",
      text: "Test text",
    },
    {
      title: "Test Title",
      text: "Test text",
    },
  ];
});
