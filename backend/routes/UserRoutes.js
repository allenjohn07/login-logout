import express from 'express'
import { User } from '../models/UserModel.js';
const router = express.Router()
import bcrypt from 'bcrypt'

//to create user
router.post('/register', async (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    if (name.length === 0 || email.length === 0 || password.length === 0) {
        return res.json({
            message: "Empty fields"
        })
    }
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.json({
                message: 'User already exists!'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ name, email, password: hashedPassword })
        res.json({
            message: 'Registered Successfully!'
        })

    } catch (error) {
        res.json({
            message: error
        })
    }
})

// to login user
router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email.length === 0 || password.length === 0) {
        res.json({
            message: 'Invalid Credentials'
        })
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({
                message: 'User does not exists!'
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.json({
                message:'Password does not match'
            })
        }
        res.json({
            message:'Login Successful',
            user: user.name
        })
    } catch (error) {
        console.error(error);
    }

})


export default router;