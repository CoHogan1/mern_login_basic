const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
// user model
const UserModel = require('../models/User')


// login page
router.get('/login', (req, res)=> {
    UserModel.find({}, (error, foundUser)=>{
        if (error) {
            res.status(400).json({error: error.message})
        }
        res.status(200).json(foundUser)
    })
})

// register page
router.get('/register', (req, res)=> {
    res.send("working")
})

// Post route, register new user into database.
router.post('/register', (req, res)=>{
    console.log(req.body)
    let { name, username, email, password, password2 } = req.body
    let errors = []

    // check req fiels
    if (!name || !username || !email || !password) {
        errors.push({ msg: "Did you forget a form field?"})
    }
    // check if passwords match
    if (password !== password2){
        errors.push({msg: `Passwords don't match.`})
    }
    // check is password is at least 6 characters long
    if (password.length < 6){
        errors.push({msg: "Password needs to be at least 6 characters"})
    }

    if (errors.length > 0){
        res.status(400).json({error: errors})
    } else {
        // validation passes
        console.log("validation passes")
        UserModel.findOne({email: email}).then(user => {
            if(user){
                console.log("user already exists")
                console.log(user)
                errors.push({msg: "User already exists"})
                res.status(400).json(user)
            } else {
                console.log("creating user")
                const newUser = new UserModel({
                    name,
                    username,
                    email,
                    password,
                    password2,
                })
                console.log(newUser, " before hash")
                // hash password
                bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(newUser.password, salt,(err, hash)=>{
                    if (err) throw err;
                    // set hash password
                    newUser.password = hash;
                    // save user.
                    newUser.save()
                    .then(user => {
                        req.flash('success_msg', "you successfully registered!")
                        console.log(user.password, " hashed")
                    })
                    .catch(err => console.log(err))
                }))
                res.status(200).json(newUser)
            }
        })
    }
})

router.get('/', (req, res)=>{
    res.send(`You're hitting the worng route. :)`)
})

module.exports = router



// } else {
//     // validation passes
//     UserModel.findOne({email: email})
//     .then(user => {
//         if(user){
//             errors.push({msg: "User already exists"})
//         } else {
//             const newUser = new User({
//                 name: name,
//                 username: username,
//                 email: email,
//                 password: password,
//                 password2: password2,
//             })
//         }
//
//     })
//
//
//     UserModel.create(req.body, (error, createdUser) =>{
//         if (error){
//             res.status(400).json({ error: error.message})
//         }
//         res.status(200).json(createdUser)
//     })
