import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    type: { type: String },
    joined: { default: Date.now },
})

export const User = mongoose.model('User', userSchema);
