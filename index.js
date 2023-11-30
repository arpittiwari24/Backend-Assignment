import express from "express"
import { config } from "dotenv"
import router from "./routes/AllRoutes.js"
import cookieParser from "cookie-parser"
import rateLimit from "express-rate-limit"
const port = 3000

config({
    path: "./.env"
})
const app = express()

const rateLimitFunction = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
    max: 5,
    message: 'You have exceeded the 5 requests in 24 hours limit!', 
    standardHeaders: true,
    legacyHeaders: false,
  });

app.use(rateLimitFunction)
app.use(express.json())
app.use(cookieParser())

app.use("/users",router)

app.listen(port, () => {
    console.log(`server started on port ${port}`);
})