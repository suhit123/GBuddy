const fetchBranchList = require('../controllers/fetching/fetchBranchList');
const fetchSubjectByYear = require('../controllers/fetching/fetchSubjectByYear');
const fetchNotes = require('../controllers/fetching/fetchNotes');
const express = require('express');
const routes = express.Router();

routes.get('/fetchBranchList', fetchBranchList.fetchBranchList)
      .get('/fetchSubjectByYear', fetchSubjectByYear.fetchSubjectByYear)
      .get('/fetchNotes' , fetchNotes.fetchNotes);

exports.route = routes;