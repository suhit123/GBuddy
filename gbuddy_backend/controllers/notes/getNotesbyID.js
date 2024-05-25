const notesSchema  = require('../../models/notesSchema');
const getNotesbyID = async (req , res) => {
    const id  = req.query.id;
    try {
        const notes = await notesSchema.findById(id);
        res.status(200).send(notes);
    } catch (error) {
        res.status(404).send(error);
    }
}

exports.getNotesbyID = getNotesbyID;