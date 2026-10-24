import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/userSchema.js';



export const register = async(req, res)=>{
    const {username, password, name, email, age, phonenumber, isStudentorProfessional, location, degree, collegeName, jobRole, companyname} = req.body;
    const isStudent = isStudentorProfessional === 'Student';
    const isProfessional = isStudentorProfessional === 'Professional';
    if(!username || !password || !name || !email || !age || !phonenumber || !location ||
        (!isStudent && !isProfessional) ||
        (isStudent && (!degree || !collegeName)) ||
        (isProfessional && (!jobRole || !companyname))){
        return res.status(400).json({message: 'Compulsory details are required'})
    }
 
    try{
        const userExists = await User.findOne({
            $or: [{username}, {email}]
        })

        if(userExists){
            return res.status(400).json({message: 'User already Exist..'})
        }
        const newUser = new User({
            username,
            password,
            name,
            email,
            age,
            phonenumber,
            isStudentorProfessional,
            location,
            degree: isStudent ? degree: undefined,
            collegeName: isStudent ? collegeName: undefined,
            jobRole: isProfessional ? jobRole: undefined,
            companyname: isProfessional ? companyname: undefined
        })

        await newUser.save();
        res.status(201).json({ message: `${name} registered successfully!` });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = async(req, res)=>{
    const {username, password} = req.body;

    try{
        const userRecord = await User.findOne({ username });
        if(!userRecord){
            return res.status(404).json({message: 'Invalid Username and Password'})
        }

        const isMatch = await bcrypt.compare(password, userRecord.password);
        if(!isMatch){
            return res.status(404).json({message: 'Invalid Username and Password'})
        }

        const token = jwt.sign(
            {id: userRecord._id, username: userRecord.username},
            process.env.JWT_SECRET,
            {expiresIn: "24h"}
        )

        res.status(200).json({
            message:"Login Successfully..",
            token,
            username: userRecord.username
        });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const me = async(req, res)=>{
    try{
        const userRecord = await User.findById(req.user.id).select('-password');
        if(!userRecord){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({user: userRecord});
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}