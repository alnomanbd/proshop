import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
import cors from 'cors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import conenctDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleWare.js'
const port = process.env.PORT || 5000

conenctDB() //Connect to MongoDB

const app = express()

//Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Cookie parser middleware
app.use(cookieParser())

app.use(cors())


app.get('/', (req, res) => {
    res.send('API is running....')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`))