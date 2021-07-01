const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const flash = require('connect-flash')
const session = require('express-session')
const app = express()
const PORT = process.env.PORT || 3001

// DB config
mongoose.connect('mongodb://localhost:27017/login', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// database monitoring.
const db = mongoose.connection
db.once('open', ()=> console.log('DB is connected.'))
db.on('error', (err)=> console.log(err.message))
db.on('disconnect', ()=> console.log('mongo disconnected.'))

// Body parser
app.use(express.urlencoded({extended: true}))

//middle wares.
app.use(express.json())
app.use(session({
    secret: 'waffels',
    resave: true,
    saveUninitialized: true,
}))
// connect flash
app.use(flash())
// global vars..
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()   
})

// white listen//set up cors middle ware.
const whitelist = ['http://localhost:3000']// all strings.
console.log(whitelist)
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            // -1 outside the array
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions))


// routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))


app.listen(PORT, console.log(`Servet started on port ${PORT}`))
