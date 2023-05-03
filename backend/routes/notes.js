const express = require('express')
const Note = require('../models/Notes')
const User = require('../models/User')
var fetchuser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
const router = express.Router()



//ROUTE 1: Get all the Notes using get 
router.get('/fetchAllnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        // res.json()
        const userId = req.user.id;
        const name = await User.findById(userId)
        const name1 = name.name;
        const data = { notes: notes, name: name1 }
        res.json(data)

    }
    catch (error) {
        res.status(500).send("Internal server error");
    }

})

// ROUTE 2: Add a new Note using; Post "/api/auth/addnote"
router.post('/addnotes', [
    body('title', 'Title is not valid').isLength({ min: 3 }),
    body('description', 'enter a name lenght more than 3').isLength({ min: 5 }),

], fetchuser, async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }
        const { title, description, tag } = req.body;
        // res.json()
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    }
    catch (error) {
        res.status(500).send("Internal server error");
    }
})


//Route 3: update an existiong note using: post "/api/auth/updatenote"  .login required 
// we use put request for updation
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    // create a newNotNe objext
    try {
        // return "api hit"
        let newNote = {};
        if (title) {       // if the user provide the title then the title changes
            newNote.title = title
        };
        if (description) {
            newNote.description = description
        }
        if (tag) {
            newNote.tag = tag;
        }

        //find the note to be updated and update

        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send("not found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true }) // $set is used to set the new note in database 

        res.json({ note })
    }
    catch (error) {
        res.status(500).send("Internal server error");
    }

})


// route 4: delete an existing note using: delete 
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {



        //find the note to be updated and update

        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send("not found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        // note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true }) // $set is used to set the new note in database 
        await Note.findByIdAndDelete(req.params.id);
        res.send(`the note of this id ${note} has been deleted`)
    }
    catch (error) {
        res.status(500).send("Internal server error");
    }
})
module.exports = router