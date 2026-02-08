import User from "../models/user.js";
import bcrypt from "bcrypt"

export function createUser(req,res){

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    console.log(hashedPassword);

    const user = new User({
        email: req.body.email,
        password: hashedPassword
    })

    user.save().then(()=>{
        res.status(201).json({
            message: "User saved successfully",
        })
    }).catch(
        ()=>{
            res.status(400).json({
                message: "User cant created"
            })
        }
    )
}

export function loginUser(req,res){

    User.findOne({
        email: req.body.email,
    }).then((user)=>{
        if(user == null){
            res.status(404).json({
                message: "Invalid email or password",
            })
        }else{
            if(bcrypt.compareSync(req.body.password, user.password)){
                res.status(200).json({
                    message : "Login Successfully",
                })
            }else{
                res.status(500).json({
                    message: "Invalid Login",
                })
            }
        }
    })
}