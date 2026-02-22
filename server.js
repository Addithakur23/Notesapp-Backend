import express from "express"
import mongoose from "mongoose" 
import dotenv from "dotenv"
import cors from "cors"
import { User } from "./models/User.js"
import { Notes } from "./models/Notes.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import verifyToken from "./middleware/authmiddleware.js"
import AdminAccess from "./middleware/adminMiddleware.js"

const app=express()
const port =3000
app.use(express.json())
app.use(cors({origin:"https://notesapp-frontend-mocha.vercel.app"}))
dotenv.config()
await mongoose.connect(process.env.MONGO_URI)
// await mongoose.connect(process.env.MONGO_URI_NOTES)

app.post('/api/Signup', async(req, res) => {
try { 
  let {Name,Email,Password}=req.body
  if(!Email.endsWith("@gmail.com")){
     return res.status(400).json({message:"Only Gamil addresses are allowed ❌"})
  }
  let salt=await bcrypt.genSalt(10)
  let hashedPassword=await bcrypt.hash(Password,salt)
console.log(req.body)
  const user=await User.create({
    Name,
    Email,
    Password:hashedPassword
  })

  res.status(201).json({
    success:true,
    data:user
  })
}
catch(error){
  res.status(500).json({success:false,message:error.message})
}

})

app.post('/api/Login', async(req, res) => {
  console.log(req.body)
 try {
  let {Email,Password}=req.body
  let user=await User.findOne({Email})
  if(!user){
    return res.status(401).json({message:"Invalid Credentials"})
  }
  let isMatch=await bcrypt.compare(Password,user.Password)
  console.log(isMatch)
  if(!isMatch){
    return res.status(401).json({message:"Invalid Credentials"})
  }
  const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1d"})
  return res.status(200).json({success:true,token})

}
 catch(error){
  res.status(500).json({message:error.message})
 }
  
})


//for notes
app.get('/api/notes',verifyToken, async(req, res) =>{
  const data=await Notes.find({user:req.id})
  console.log(data)
  res.json(data)
})

app.post('/api/notes',verifyToken, async(req, res) =>{
   try{
   
    const {Title,Content}=req.body
    console.log(req.body)
   const note=await Notes.create({
    Title,Content,user:req.id
   })
   
   res.status(201).json({success:true,data:note})}
   catch(error){
      res.status(500).json({success:true,message:error.message})
   }

})

app.delete('/api/notes/:id',verifyToken, async(req, res) =>{
  const note=await Notes.deleteOne({_id:req.params.id,user:req.id})
  if(note.deletedCount==0){
    return res.status(400).json({message:"Note not found"})
  }
  res.json({message:"Note Deleted Successfully"})
})

app.put('/api/notes/:id',verifyToken, async(req, res) =>{
  const updateNote=await Notes.findByIdAndUpdate({_id:req.params.id,user:req.id},{Title:req.body.Title,Content:req.body.Content},{new:true})
  if(!updateNote){
    res.status(400).json({message:"Note not Found"})
  }
res.json(updateNote)

})

app.get("/api/users",verifyToken,AdminAccess,async(req, res) =>{
 try {const data=await User.find().select("-Password")
  res.json(data)}
  catch(error){
    res.status(500).json({message:"Server Error"})
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})