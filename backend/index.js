import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import UserRoutes from './routes/UserRoutes.js'
dotenv.config()
const port = process.env.PORT || 8000

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    return res.status(200).send('Welcome')
})


app.listen(port, () => console.log(`server started at: ${port}`))
app.use('/', UserRoutes)

mongoose.connect(process.env.mongodb_url).then(() => console.log("database connected")).catch((err) => console.log(err))



