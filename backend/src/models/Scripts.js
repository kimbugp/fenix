const mongoose = require('mongoose')

const scriptsSchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    lastRun: {
        type: Date,
        default: Date.now()
    },
    output: [{
        date: {
            type: Date,
            default: Date.now()
        },
        content: {
            type: String,
        }
    }],
    date: {
        type: Date,
        default: Date.now()
    },

})

const Scripts = mongoose.model('Scripts', scriptsSchema)

module.exports = Scripts