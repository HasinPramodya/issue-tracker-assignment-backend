import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export async function createUser(req, res) {

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    console.log(hashedPassword);

    const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: hashedPassword,
        role: req.body.role,
    })

    user.save().then(() => {
        res.status(201).json({
            message: "User created successfully",
        })
    }).catch(
        () => {
            res.status(400).json({
                message: "User cant created"
            })
        }
    )
}

export async function loginUser(req, res) {

    User.findOne({
        email: req.body.email,
    }).then((user) => {
        console.log(user);
        if (user == null) {
            res.status(404).json({
                message: "Invalid email or password",
            })
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const userData = {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                }
                const token = jwt.sign(userData, process.env.JWT_KEY)
                res.status(200).json({
                    message: "Login successfully",
                    token: token,
                    user: userData
                })
            } else {
                res.status(500).json({
                    message: "Invalid Login",
                })
            }
        }
    })
}

export async function getAllUsers(req, res) {
    if (req.user.role !== "admin") {
        res.status(403).json({
            message: "Not authorized to get all user",
        })
        return;
    }
    try{
        const users = await User.find()
        return res.status(200).json({
            users: users
        })
    }catch(err){
        res.status(500).json({
            message: "Error getting users",
        })
    }



}