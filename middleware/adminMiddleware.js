import verifyToken from "./authmiddleware.js";
function AdminAccess(req,res,next){
    console.log(req.role)
    if(req.role!=="admin"){
        return res.status(403).json({message:"Access Denied"})
    }
    next();
}
export default AdminAccess