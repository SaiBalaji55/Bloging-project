import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'UserSchema',
        required: true
    },
    questionType:{
        type: String,
        required: true,
        enum:['How-to / Troubleshooting', 'Tooling recommendation', 'Best practices', 'General advice / Other'],
        default: 'How-to / Troubleshooting',
    },
    questionTitle:{
        type: String,
        required: true,
        minlength: 15,
        maxlength: 150
    },
    questionDescription:{
        type: String,
        required: true,
        minlength: 75,
        maxlength: 1500
    },
    tags: [{
        type: String,
        lowercase: true, 
        trim: true,    
        required: true
    }],
    postingDestination: {
        type: String,
        required: true,
        enum: ['staging_ground', 'public_feed'],
        default: 'staging_ground' 
    },
    voteScore: {
        type: Number,
        default: 0
    },
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true
})

const Question = mongoose.model("Question", questionSchema);

export default Question 