import { Setup,  getMyUrls,  login, logout, register } from "../controllers/Auth.js"
import express from "express"
import  { isAuthenticated } from "../middleware/auth.js"
import GetUrl from "../controllers/GetUrls.js"
import shortening from "../controllers/Shortening.js"

const  router = express.Router()

router.get("/setup",Setup)
router.post("/signup",register)
router.post("/login",login)
router.get("/:urlId",GetUrl)
router.post("/short",isAuthenticated,shortening)
router.get("/me",isAuthenticated,getMyUrls)
router.get("/logout",logout)

export default router