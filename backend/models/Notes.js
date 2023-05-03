const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,    //it is like the foreign key. Actually we are keep an key for another objectt that is our notes,
        ref: 'user'                                  //it is like reference
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        // unique: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model('notes', NotesSchema);