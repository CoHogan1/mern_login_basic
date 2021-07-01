const express = require('express')
const router = express.Router()
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
    // UserModel.find({}, (error, foundUsers)=>{
    //     if (error) {
    //         res.status(400).json({error: error.message})
    //     }
    //     res.status(200).json(foundUsers)
    // })
    res.send("working")
})

// Post route, register new user into database.
router.post('/register', (req, res)=>{
    //console.log(req.body)
    let { name, username, email, password, password2 } = req.body
    console.log(name)
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
        UserModel.create(req.body, (error, createdUser) =>{
            if (error){
                res.status(400).json({ error: error.message})
            }
            res.status(200).json(createdUser)
        })
    }
})




router.get('/', (req, res)=>{
    res.send(`You're hitting the worng route. :)`)
})

module.exports = router
