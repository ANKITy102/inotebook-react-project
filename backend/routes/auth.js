const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchUser');
const JWT_SECRET = "Harryisagoodb$oy";
// create a user using: POST "/api/auth/". Doesn't require Auth
// router.get('/', (req, res) => {

//ROUTE1: Create a User using : POST '/api/auth/createUaser" .No login required
router.post('/createUser', [
    body('email', 'email is not valid').isEmail(),       //to get default message on error just add message after email
    body('name', 'enter a name lenght more than 3').isLength({ min: 3 }),
    body('password', 'password lenght should by more than 5').isLength({ min: 6 })

], async (req, res) => {

    // const user = User(req.body);
    // user.save();
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, error: errors.array() })
    }
    // check whether the email exists already

    try {


        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: " Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({     //create is the function to create a data in mongodb and User is our schema we are using to communicate with database
            name: req.body.name,
            password: secPass,   //secPass ->secret password
            email: req.body.email
        })
        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })
        // User.create({
        //     name: req.body.name,
        //     password: req.body.password,
        //     email: req.body.email,
        // }).then(user => res.json(user))
        //     .catch(err => {
        //         res.json({ error: 'Please enter a unique value for email' })
        //     });
        // res.send(req.body)
        // res.json({ "Nice": "nice" })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})



//ROUTE 2: authentication a user using: post "/api/auth/login". no login required
router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', "password can not be blank").exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ success, error: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let success = false
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "please try to login with correct credentials" })
        }
        //used to compare user entered password and saved has password
        const passwordCompare = await bcrypt.compare(password, user.password);
        // if password does not match with hash password
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "please try to login with correct credentials" })
        }

        //bring user data after password verification that is payLoad
        const payload = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(payload, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Servar Error second")
    }
})


// ROUTE 3: Get loggedin user detail : using post '/api/auth/getuser login required
router.post('/getUser', fetchuser, async (req, res) => {   //here async(req,res) will be called by next function in fetchUser
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password"); //select everything accept the password
        res.send(user)
    }
    catch (error) {
        res.status(500).send("some internal serve issue")
    }
})
module.exports = router