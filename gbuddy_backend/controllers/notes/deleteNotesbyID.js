const notesSchema = require('../../models/notesSchema');
const deleteNotesbyID = async(req , res) =>{
    const id = req.params.id;
    try{
        await notesSchema.findByIdAndDelete(id);
        res.status(200).send("Deleted Successfully");
    }
    catch(error){
        res.status(400).send(error);
    }
}
exports.deleteNotesbyID = deleteNotesbyID;