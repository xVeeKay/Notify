import mongoose from "mongoose";

const noteSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        default:[]
    },
    pinned:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now
    }
})
export default mongoose.model("Note",noteSchema)