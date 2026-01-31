import Note from '../models/note.model.js'

const getNotes=async(req,res)=>{
    const notes=await Note.find()
    res.json({notes,success:true});
}

const addNote=async(req,res)=>{
    try {
        const {title,content,tags,pinned}=req.body
        const tagsArray=tags?tags.split(",").map(t=>t.trim()).filter(Boolean):[]
        const note=await Note.create({title:title.trim(),content:content.trim(),tags:tagsArray,pinned})
        res.json({note,success:true})
    } catch (error) {
        console.log("error while creating note, ",error)
        res.json({message:"Error while creating note",success:false})
    }
}

const deleteNote=async(req,res)=>{
    await Note.findByIdAndDelete(req.params.id)
    res.json({message:"Deleted",success:true})   
}

const updateNote=async(req,res)=>{
    const {title,content,tags,pinned}=req.body
    await Note.findByIdAndUpdate(req.params.id,{title,content,tags,pinned})
    res.json({message:"Updated",success:true})   
}

const handlePin=async(req,res)=>{
    const {pinned}=req.body
    await Note.findByIdAndUpdate(req.params.id,{pinned})
    res.json({message:"Pin toogled successfully",success:true})
}

export {
    getNotes,
    addNote,
    deleteNote,
    updateNote,
    handlePin
}