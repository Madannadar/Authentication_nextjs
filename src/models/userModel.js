import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: string,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: string,
        required: [true, "Please provide a username"],
        unique: true,
    },
    password: {
        type: string,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: string,
    forgotPasswordTokenExpiry: Date,
    verifyToken: string,
    verifyTokenExpiry: Date
})

const User = mongoose.models.users || mongoose.model('User', userSchema)

export default User;