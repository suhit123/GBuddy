const notesSchema = require('../../models/notesSchema');
const fetchBranchList = async(req , res) => {
    let set = new Set();
    try{
        const notes = await notesSchema.find();
        notes.forEach((note) => {
            set.add(note.branch);
        });
        res.status(200).send(Array.from(set));
    }
    catch(error){
        res.status(400).send(error);
    }

}

exports.fetchBranchList = fetchBranchList;