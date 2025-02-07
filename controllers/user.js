const User = require("../models/user")

// async function handleGetAllUsers(req, res) {
//     const allDbUsers = await User.find({});
//     return res.json(allDbUsers)
// }

async function handleGetAllUsers(req, res) {
    try {
        console.log("Fetching all users...");
        const allDbUsers = await User.find({});
        console.log("Users found:", allDbUsers);
        return res.json(allDbUsers);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


async function handlegetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found" })
    return res.json(user)
}

async function handleUpdateUserById(req, res){
    await User.findByIdAndUpdate(req.params.id, {lastName:"chnged name"});
    return res.json({status:"Success"});
}

async function handleDeleteUserById(req, res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"Success"})
}

async function handleCreateNewUser(req, res){
    console.log("Request Body:", req.body);
    const body = req.body;
    
    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.Job_Title
    ) {
        return res.status(400).json({ msg: "All fields are required." });
    }

    try {
        const result = await User.create({
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            gender: body.gender,
            jobTitle: body.Job_Title
        });

        // console.log("result:", result);
        return res.status(201).json({ msg: "User created successfully", id: result._id });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
}

module.exports = { handleGetAllUsers, handlegetUserById,handleUpdateUserById,handleDeleteUserById,handleCreateNewUser }