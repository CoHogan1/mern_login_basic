const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// user model
const User = require('../models/User')

modeul.exports = function(passport) {
    passport.use(
        new localStrategy({usernameField: 'email'}, (email, password, done)=>{
            // find user
            User.findOne({email: email})
            .then(user =>{
                if(!user){
                    return done(null, false, {message: "That email is not registered."})
                }
                // match password.
                bcrypt.compare(password, user.password, (err, isMatch)=>{
                    if(err) {throw error}

                    if(isMatch){
                        return done(null, user)
                    } else {
                        return done(null, false, {message: "Passwords do not match"})
                    }
                })
            })
            .catch(err => console.log(err))
        })
    )
}

passport.serializeUser((user,done) => {
    done(null, user.id)
})


passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})
