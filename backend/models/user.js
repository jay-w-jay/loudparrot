import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let userSchema = new Schema({
    userName: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    password: { type: String },
    active: { type: Boolean },
    admin: { type: Boolean },
    finance: { type: Boolean },
    superAdmin: { type: Boolean },
    company: { type: String },
    dateCreated: { type: Date },
    securityQuestion: { type: String },
    securityQuestionAnswer: { type: String },
    email: { type: String },
    lastLogin: { type: Date }
});

export default mongoose.model('User', userSchema);