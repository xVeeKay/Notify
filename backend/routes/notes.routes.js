import express from 'express'
const app=express()
const router=express.Router()
import { getNotes,addNote,deleteNote,updateNote,handlePin } from '../controllers/notesControllers.js'
import auth from '../middlewares/authMiddleware.js'

router.get('/',auth,getNotes)
router.post('/',auth,addNote)
router.delete('/:id',auth,deleteNote)
router.put('/:id',auth,handlePin)
router.post('/:id',auth,updateNote)

export default router
