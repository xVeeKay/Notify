import express from 'express'
const router=express.Router()
import { signup,login } from '../controllers/authControllers.js'
import auth from '../middlewares/authMiddleware.js'


router.get('/me',auth,(req,res)=>{res.json({user:req.user})})
router.post('/signup',signup)
router.post('/login',login)


export default router