import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({

     username: {
        type: String, 
        required: true,
        unique: true
    },
    password: { // New field for the password
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phonenumber:{
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 15
    },
    age:{
        type: Number,
        required: true
    },
    isStudentorProfessional:{
        type: String,
        required: true,
        enum: ['Student', 'Professional'],
        default: 'Student'
    },
    location:{
        type:String,
        required: true,
    },
    degree :{
        type:String,
        required: function() {return this.isStudentorProfessional === 'Student'}
    },
    collegeName:{
        type: String,
        required: function() {return this.isStudentorProfessional === 'Student'}
    },
    jobRole:{
        type: String,
        required: function() {return this.isStudentorProfessional === 'Professional'}
    },
    companyname:{
        type: String,
        required: function() {return this.isStudentorProfessional === 'Professional'}
    },
    profilePicture: {
        type: String,
        default: ""
    },
}, {timestamp: true})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    catch{
        throw new Error(error.message);
    }
});

const UserSchema = mongoose.model("UserSchema", userSchema);
export default UserSchema; 