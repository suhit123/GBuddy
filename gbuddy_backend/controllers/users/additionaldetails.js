const usersSchema = require("../../models/user/userSchema");


const AdditionalDetails = async (req, res) => {
    try {
        const data = await usersSchema.findOne({"email": req.query.email});
        if (!data) {
            console.log("User not found");
            res.status(404).send("User not found");
            return;
        }

        data.year = req.body.year;
        data.campus = req.body.campus;
        data.branch = req.body.branch;
        data.rollnumber = req.body.rollnumber;
        data.linkedin = req.body.linkedin;
        data.github = req.body.github;
        data.leetcode = req.body.leetcode;
        data.semester = req.body.semester;
        data.displayname = req.body.displayname;
        data.phone = req.body.phone;
        data.about = req.body.about;

        await data.save();
        res.status(200).json(data);
        console.log("Data Edited Successfully", data);

    } catch (error) {
        res.status(400).json(error?.message)
    }

};

exports.AdditionalDetails = AdditionalDetails;