
const User = require('../models/User')

async function createSuperUser() {

    const admin = {
        name: process.env.ADMIN_NAME,
        password: process.env.ADMIN_PASSWORD,
        email: process.env.ADMIN_EMAIL,
        isAdmin: true
    }
    const user = new User(admin)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        console.log(user)
        return token
    } catch (error) {
        console.log(error)
    }
}

module.exports = createSuperUser
