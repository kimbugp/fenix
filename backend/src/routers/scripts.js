const express = require('express')
const Script = require('../models/Scripts')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const fakeRunner = require('../lib/scriptRunner')

const router = express.Router()

router.post('/scripts', auth, async (req, res) => {
    // Create a script
    try {
        const script = new Script(req.body)
        await script.save()
        res.status(201).send({ script })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/scripts', auth, async (req, res) => {
    // Get all a script
    try {
        const scripts = await Script.find({ author: req.user })
        res.status(201).send({ scripts })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/scripts/:scriptId', auth, async (req, res) => {
    // Get one script
    try {
        const scripts = await Script.findOne({ author: req.user, _id: req.params.scriptId })
        res.status(201).send({ scripts })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.put('/scripts/:scriptId', auth, async (req, res) => {
    // update one script
    try {
        const script = await Script.findOneAndUpdate({ author: req.user, _id: req.params.scriptId }, { $set: { content: req.body.content } })
        res.status(201).send({ script })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/scripts/:scriptId', auth, async (req, res) => {
    // delete one script
    try {
        const script = await Script.findOneAndDelete({ author: req.user, _id: req.params.scriptId })
        res.status(201).send({ script })
    } catch (error) {
        res.status(400).send(error)
    }
})


router.get('/scripts/:scriptId/run', auth, async (req, res) => {
    // run one script
    try {
        const script = await Script.findById({ author: req.user, _id: req.params.scriptId })
        const output = fakeRunner(script.content).join('\n')
        res.status(201).send({ output })
    } catch (error) {
        res.status(400).send(error)
    }
})


router.get('/scripts/:scriptId/outputs', auth, admin.adminOrOwner, async (req, res) => {
    // get output
    try {
        const script = req.script
        res.status(201).send({ output: script.output })
    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports = router