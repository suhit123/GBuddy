const notesSchema = require('../../models/notesSchema');

const fetchNotes = async (req, res) => {
    try {
        if (req.query.year !== "" && req.query.subject !== "" && req.query.unit !== "" && req.query.branch !== "") {
            const notes = await notesSchema.find({ year: req.query.year, subject: req.query.subject, unit: req.query.unit, branch: req.query.branch });
            console.log(notes);
            res.status(200).send(notes);
        }
        else if(req.query.year !== "" && req.query.branch !== ""){
            const notes = await notesSchema.find({ year: req.query.year, subject: req.query.subject });
            console.log(notes);
            res.status(200).send(notes);
        }
        else if(req.query.year !== "" && req.query.subject !== ""){
            const notes = await notesSchema.find({ year: req.query.year, subject: req.query.subject });
            console.log(notes);
            res.status(200).send(notes);
        }
        else if(req.query.year !== ""){
            const notes = await notesSchema.find({ year: req.query.year });
            console.log(notes);
            res.status(200).send(notes);
        }
        else {
            const notes = await notesSchema.find();
            console.log(notes);
            res.status(200).send(notes);
        }
    }
    catch (error) {
        res.status(400).send(error?.message);
    }
}

exports.fetchNotes = fetchNotes;