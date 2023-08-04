import User from "../model/User";
import bcrypt from 'bcryptjs';

export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }
    if (!users) {
        return res.status(404).json({ message: "No user found" });
    }
    return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    let exist;
    try {
        exist = await User.findOne({ email });

    } catch (err) { return console.log(err); }
    if (exist) {
        return res.status(400).json({ message: 'Use different email' })
    }
    const hashedpass = bcrypt.hashSync(password);

    const user = new User({
        name,
        email,
        password: hashedpass,
        blogs: []
    });

    try {
        await user.save();
    } catch (err) {
        return console.log(err);
    }
    return res.status(201).json({ user });
}

export const login = async(req,res,next)=>{
    const {email,password}= req.body;
    let exist;
    try {
        exist = await User.findOne({ email });

    } catch (err) { return console.log(err); }
    if (!exist) {
        return res.status(404).json({ message: 'User not found!' })
    }
    const isPassCorr = bcrypt.compareSync(password, exist.password );
    if(!isPassCorr){
        return res.status(400).json({message:"Incorrect password"})
    }
    return res.status(200).json({message:"Login done", user: exist})
}

