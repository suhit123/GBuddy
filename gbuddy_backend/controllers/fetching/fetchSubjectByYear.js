const notesSchema = require('../../models/notesSchema');

const fetchSubjectByYear = async (req , res) => {
    let x = new Set();
    try{
        const notes = await notesSchema.find({year: req.query.year , branch : req.query.branch});
        notes.forEach((note) => {
            x.add(note.subject);
        });
        res.status(200).send(Array.from(x));
    }
    catch(error){
        res.status(400).send(error?.message);
    }
}

exports.fetchSubjectByYear = fetchSubjectByYear;