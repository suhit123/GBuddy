const notesSchema = require('../../models/notesSchema');
const editNotesbyID = async (req , res) => {
    const id = req.query.id;
    console.log(req.body);
    try{
        await notesSchema.findByIdAndUpdate(id , req.body);
        res.status(201).send("Notes Updated");
    }
    catch(error){
        res.status(400).send(error);
    }
}

exports.editNotesbyID = editNotesbyID;