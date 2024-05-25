const addNotes = require("../controllers/notes/addNotes.js");
const getNotesbyID = require("../controllers/notes/getNotesbyID.js");
const editNotesbyID = require("../controllers/notes/editNotesbyID.js");
const deleteNotesbyID = require("../controllers/notes/deleteNotesbyID.js");
const express = require("express");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const routes = express.Router();
routes
  .post("/addNotes", upload.single('file'),  addNotes.addNotes)
  .get("/getnotesbyID", getNotesbyID.getNotesbyID)
  .delete("/deletenotesbyID/:id", deleteNotesbyID.deleteNotesbyID)
  .patch("/editnotesbyID", editNotesbyID.editNotesbyID);
  

exports.route = routes;
