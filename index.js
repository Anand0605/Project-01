const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require('fs');
const mongoose = require("mongoose");
const { type } = require("os");

const app = express();
const PORT = 3000;

// connection

mongoose.connect('mongodb://127.0.0.1:27017/test-project')
    .then(() => console.log("mongodb connect"))
    .catch((err) => console.log("mongoose error", err))


// schema

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
    
},{timestamps:true})

const User = mongoose.model("user", userSchema)

// middileware
app.use(express.urlencoded({ extended: false }))

// app.use((req, res, next)=>{
//     // console.log("hello from middleware 1");
//     // return res.json({msg:"hello from middleware 1"})
//     next()
// })

// Route to get all users
// app.get("/api/users", (req, res) => {
//     // res.setHeader("myName","Anand")  custom header
//     return res.json(users);
// });

app.get('/users', async (req, res) => {
    try {
        const allDbUsers = await User.find({});
        const html = `
            <ul>
                ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
            </ul>
        `;
        res.send(html);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Error fetching users.");
    }
});

// Route to get user by ID
// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);

//     if (user) {
//         return res.json(user); // Return user details if found
//     } else {
//         return res.status(404).json({ message: "User not found" }); // Handle invalid IDs
//     }
// });
// create new todo
// app.post("/api/users", (req, res) => {
//     const body = req.body;
//     users.push({ ...body, id: users.length + 1 });
//     fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
//         return res.status(201).json({ status: "success", id: users.length })
//     })
// })
// todo edit with user id
// app.patch("/api/users:id",(req, res)=>{
//     return res.json({status:"pending"})
// })

// app.patch("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const userIndex = users.findIndex((user) => user.id === id);

//     if (userIndex === -1) {
//         return res.status(404).json({ message: "User not found" });
//     }

//     // Update only the provided fields
//     const updatedUser = { ...users[userIndex], ...req.body };
//     users[userIndex] = updatedUser;

//     return res.json({ message: "User updated successfully", user: updatedUser });
// });
// todo delete with user id
app.delete("/api/users", (req, res) => {
    return res.json({ status: "pending" })
})

// app.route("/api/users/:id")
//    .get( (req, res) => {
//         const id = Number(req.params.id);
//         const user = users.find((user) => user.id === id);

//         if (user) {
//             return res.json(user); // Return user details if found
//         } else {
//             return res.status(404).json({ message: "User not found" }); // Handle invalid IDs
//         }
//     })
//     .post((req, res)=>{
//         return res.json({status:"pending"})
//     })
//     .patch((req, res)=>{
//         return res.json({status:"pending"})
//     })
//     .delete((req, res)=>{
//         return res.json({status:"pending"})
//     })

// data create
// app.post("/api/users", async (req, res) => {
//     const body = req.body;
//     if (
//         !body ||
//         !body.first_name ||
//         !body.last_name ||
//         !body.email ||
//         !body.gender ||
//         !body.job_title
//     ) {
//         return res.status(400).json({ msg: "All fields are required." });
//     }

//     try {
//         const result = await User.create({
//             firstName: body.first_name,
//             lastName: body.last_name,
//             email: body.email,
//             gender: body.gender,
//             jobTitle: body.job_title
//         });

//         console.log("result:", result);
//         return res.status(201).json({ msg: "User created successfully", data: result });
//     } catch (error) {
//         console.error("Error:", error);
//         return res.status(500).json({ msg: "Internal Server Error", error: error.message });
//     }
// });




app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
