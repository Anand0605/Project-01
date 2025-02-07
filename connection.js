
// 'mongodb://127.0.0.1:27017/test-project'
const mongoose = require("mongoose");

async function connectMongoDb(url){
    return mongoose.connect(url)
}

module.exports = {connectMongoDb}