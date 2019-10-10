import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Department = new Schema({
    name: { type: String },
    description: { type: String },
    active: { type: Boolean },
    maxEmployees: { type: Number },
    minEmployees: { type: Number },
    allowOvertime: { type: Boolean },
    allowPenalty: { type: Boolean }
});

export default mongoose.model('Department', Department);