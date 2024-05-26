const usersSchema = require('../../models/user/userSchema');
const bycrypt = require('bcrypt');
const addUser = async (req, res) => {
    try {
        req.body.password = await bycrypt.hash(req.body.password, 10);
        const user = await usersSchema.create({
            email: req.body.email,
            password: req.body.password,
            username : req.body.username,
            phone: req.body.phone,
            displayName: req.body.displayName,
            description: req.body.description,
            year: req.body.year,
            profileUrl: req.body.profileUrl,
            score: req.body.score,
        });
        user.save();
        res.status(201).send(user);
        console.log("User Added Successfully", user);
    
    } catch (error) {
        console.error("Error in adding user:", error.message);
        res.status(404).send("error in adding user", error?.message);
    }
}

exports.addUser = addUser;