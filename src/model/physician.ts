import mongoose, {Document, Model, Schema, Types} from "mongoose";
import {getNextSequenceValue} from "./primaryIdCounter";

interface IPhysician {
    _id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    sex: 'M' | 'F' | 'O';
    address: string;
    city: string;
    province: string;
    phoneNumber: string;
    email: string;
    medicalLicenseId: string;
    specialty: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const physicianSchema:Schema<IPhysician> = new mongoose.Schema({
    _id:{type: Number, required: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    sex: { type: String, enum: ['M', 'F', 'O'], required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    medicalLicenseId: { type: String, required: true, unique: true },
    specialty: { type: String, required: true }
}, { timestamps: true, _id: false });

// Pre-save hook for auto-incrementing `physicianId`
physicianSchema.pre('save', async function (next) {
    if (this.isNew) {
        this._id = await getNextSequenceValue('Physician', '_id');
    }
    next();
});

const physician: Model<IPhysician> = mongoose.model<IPhysician>("Physician", physicianSchema);

module.exports = physician;