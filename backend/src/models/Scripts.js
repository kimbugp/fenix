const mongoose = require('mongoose')


var output = new mongoose.Schema({
    isActive: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    },
    content: {
        type: Array,
        default: []
    }
});

const scriptsSchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: Array,
        required: true,
        trim: true
    },
    lastRun: {
        type: Date,
        default: Date.now()
    },
    output: [output],
    date: {
        type: Date,
        default: Date.now()
    },

})

const Scripts = mongoose.model('Scripts', scriptsSchema)

module.exports = Scripts