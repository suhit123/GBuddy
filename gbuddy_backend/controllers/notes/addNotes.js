const { google } = require('googleapis');
const fs = require('fs');
const notesSchema = require('../../models/notesSchema');


const credentials = require('../notes/credentials.json');
const { format } = require('path');
const scopes = ['https://www.googleapis.com/auth/drive'];
const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  scopes
);

const drive = google.drive({ version: 'v3', auth });

const addNotes =
  async (req, res) => {
    try {
      const fileMetadata = {
        name: req.file.originalname,
        parents: ['1FcYJIQO2NmEjECPhP16-36vsrQqXr6dR'],
      };

      const media = {
        mimeType: req.file.mimetype,
        body: fs.createReadStream(req.file.path),
      };

      const response = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id',
      });

      const fileId = response.data.id;
      const fileUrl = `https://drive.google.com/uc?id=${fileId}`;
      fs.unlinkSync(req.file.path);
      req.body.documentUrl = fileUrl;

      // Save metadata to the database with the file URL
      console.log(fileUrl);
      console.log('----');

      try {
        const notes = await notesSchema.create({
          sem: req.body.sem,
          userId: req.body.userId,
          year: req.body.year,
          branch: req.body.branch,
          subject: req.body.subject,
          unit: req.body.unit,
          format:req.body.format,
          description: req.body.description,
          faculty:req.body.faculty||'',
          documentUrl: fileUrl
        });
        notes.save();
        res.status(201).send(notes);
        console.log("Uploaded Successfully in DB", notes)
      }
      catch (error) {
        res.status(404).send("error in uploading file in DB", error?.message);
      }
      console.log('Uploaded Successfully to Drive');
    }

    catch (error) {
      console.log('Error uploading file to Drive', error);
      res.status(404).send({ error });
    }
  };

exports.addNotes = addNotes;