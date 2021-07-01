const mongoose = require('mongoose')
const {Schema, model} = mongoose

const userSchema = new Schema({
    name:      {type:String, required: true},
    username:  {type:String, required: true},
    email:     {type:String, required: true},
    password:  {type:String, required: true},
    password2:  {type:String, required: true},
}, {timestamps: true})

module.exports = model('User', userSchema)
