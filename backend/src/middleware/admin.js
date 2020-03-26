const jwt = require('jsonwebtoken')
const Scripts = require('../models/Scripts')
var isValidMongoId = function (id) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        return true;
    }
    return false;
}

const adminOrOwner = async (req, res, next) => {
    try {
        const user = req.user
        if (scriptId && isValidMongoId(scriptId)) {
            let scriptId = req.params.scriptId
            const script = Scripts.findById(scriptId)
            req.script = script
            if (user.isAdmin) {
                return next()
            }
            if (script && script.author === user) {
                return next()
            }
            res.status(401).send({ error: 'Not authorized to access this resource' })

        }
        else {
            res.status(400).send({ error: 'Invalid id' })
        }
    } catch (error) {
        res.status(400).send({ error: error })
    }

}

const isAdmin = async (req, res, next) => {
    try {
        const user = req.user
        if (user.isAdmin) {
            return next()
        }
        res.status(401).send({ error: 'Not authorized to access this resource' })
    } catch (error) {
        res.status(400).send({ error: error })
    }
}
module.exports = { adminOrOwner, isAdmin }