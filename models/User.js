import mongoose from "mongoose";
let UserSchema=new mongoose.Schema({
    Name:String,
    Email:String,
    Password:String,
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
})
export const User=mongoose.model("user",UserSchema)