const express = require('express')

const router = express.Router()


// login page
router.get('/login', (req, res)=> {
    res.send("this is the login route")

})

// register page
router.get('/register', (req, res)=> {
    res.send("register route")

})

router.get('/', (req, res)=>{
    res.send(`You're hitting the worng route. :)`)
})

module.exports = router
