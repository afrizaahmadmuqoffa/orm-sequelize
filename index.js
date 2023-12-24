const express = require('express')
const port = 3000
const User = require('./models/users')
const sequelize = require('./config/db.js')
const app = express()

app.use(express.json())

sequelize.sync({ force: true }).then(() => {
    console.log('Database and tables synced');
});


app.get('/get-users', async (req, res) => {
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

app.post('/create-user', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
        })
        res.json(newUser)
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

app.put('/update-user/:id', async (req, res) => {
    const userId = req.params.id

    try {
        const user = await User.findByPk(userId)

        if (user) {
            await user.update({ username: req.body.username, email: req.body.email })
            res.json(user)
        } else {
            res.status(404).json({ error: "User not found!" })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "Internal server error" })
    }
})

app.delete('/delete-user/:id', async (req, res) => {
    const userId = req.params.id

    try {
        const user = await User.findByPk(userId)
        if (user) {
            await user.destroy()
            res.json({ message: "Delete success!" })
        } else {
            res.status(400).json({ error: "User not found!" })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "Internal server error" })
    }
})

app.listen(port, () => {
    console.log(`Run in http://localhost:${port}`)
})