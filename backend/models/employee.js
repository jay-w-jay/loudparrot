import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Employee = new Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobileNo: { type: String },
    personalEmail: { type: String },
    workEmail: { type: String },
    gender: {type: String, required: true, enum: ['Male', 'Female']},
    telNo: { type: String },
    homeAddress: { type: String },
    homeTown: { type: String },
    postCode: { type: String },
    idNo: { type: Number, required: true },
    pinNo: { type: String },
    nssfNo: { type: String },
    nhifNo: { type: String },
    dateOfBirth: { type: Date },
    dateEmployed: { type: Date },
    contractType: { type: String },
    departmentId: { type: String },
    contractSoftCopy: { type: String },
    bankName: { type: String },
    bankBranch: { type: String },
    accountNo: { type: String },
    bankCode: { type: String },
    branchCode: { type: String },
    hasOvertime: { type: Boolean },
    nextOfKinName: { type: String },
    nextOfKinRelationship: { type: String },
    nextOfKinTel: { type: String },
    nextOfKinEmail: { type: String }
});

export default mongoose.model('Employee', Employee);