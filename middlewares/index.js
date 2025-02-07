const fs = require("fs");

function logReqRes(filename) {
    return (req, res, next) => {
        fs.appendFile(
            filename,
            `\n${Date.now()}: ${req.ip} ${req.method}: ${req.path}\n`,
            (err, data) => {
                next();
            }
        );
    }
}

// app.use((req, res, next)=>{
//     // console.log("hello from middleware 1");
//     // return res.json({msg:"hello from middleware 1"})
//     next()
// })

module.exports = { logReqRes }