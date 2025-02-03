const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require('fs');

const app = express();
const PORT = 8000;

// middileware
app.use(express.urlencoded({extended:false}))

// app.use((req, res, next)=>{
//     // console.log("hello from middleware 1");
//     // return res.json({msg:"hello from middleware 1"})
//     next()
// })

// Route to get all users
app.get("/api/users", (req, res) => {
    // res.setHeader("myName","Anand")  custom header
    return res.json(users);
});

// app.get('/users',(req, res)=>{
//     const html =
//     <ul>
//     ${users.map((user)=><li>${user.first_name}</li>)}
//     </ul>
//     ;
//     res.send(html);
// })

// Route to get user by ID
app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if (user) {
        return res.json(user); // Return user details if found
    } else {
        return res.status(404).json({ message: "User not found" }); // Handle invalid IDs
    }
});
// create new todo
app.post("/api/users",(req, res)=>{
    const body = req.body;
    users.push({...body, id:users.length +1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.status(201).json({status:"success", id:users.length })
    })
    
    
})
// todo edit with user id
// app.patch("/api/users:id",(req, res)=>{
//     return res.json({status:"pending"})
// })

app.patch("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    // Update only the provided fields
    const updatedUser = { ...users[userIndex], ...req.body };
    users[userIndex] = updatedUser;

    return res.json({ message: "User updated successfully", user: updatedUser });
});
// todo delete with user id
app.delete("/api/users",(req, res)=>{
    return res.json({status:"pending"})
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





app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
