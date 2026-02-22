import mongoose from "mongoose";
let NotesSchema=new mongoose.Schema({
    Title:String,
    Content:String,
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    }
})
export const Notes=mongoose.model("notes",NotesSchema)