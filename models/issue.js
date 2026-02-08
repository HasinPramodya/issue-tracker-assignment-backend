import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    status : {
        type: String,
        enum: ["Open", "In-Progress", "Resolved"],
        required: true,
        default: 'Open'
    },
    priority : {
        type: String,
        enum: ["High", "Medium", "Low"],
        required: true,
        default: 'Low'
    },
    assignee : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt : {
        type: Date,
        required: true,
        default: Date.now(),
    }
})

const Issue = mongoose.model('Issue', issueSchema);

export default Issue;