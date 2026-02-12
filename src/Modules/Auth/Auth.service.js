import UserModel from "../../DB/Models/Users/Users.model.js";
export const createUser=async(req,res)=>{
    try {
        const {name,email,password,age}=req.body;
        if(!name || !email || !password || !age){
            return res.status(400).json({message:"All fields are required",status:"error"});
        }
        const user=await UserModel.create({name,email,password,age});
        return res.status(201).json({message:"User created successfully",status:"success",user});
    } catch (error) {
        return res.status(500).json({message:error.message,status:"error" ,stack:error.stack});
    }
}