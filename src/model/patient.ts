import mongoose, {Model, Schema, Types} from "mongoose";
import {getNextSequenceValue} from "./primaryIdCounter";

// Interface to restrict data type for the schema of the patient table
interface IPatient {
    _id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    sex: 'M' | 'F' | 'O';
    address: string;
    city: string;
    province: string;
    country: string;
    postalCode?: string;
    phoneNumber: string;
    email: string;
    governmentId: string;
    ssn?: string;
    emergencyContact: Types.ObjectId;
}


const patientSchema:Schema<IPatient> = new mongoose.Schema({
    _id: {type: Number, required: true, unique: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    sex: { type: String, enum: ['M', 'F', 'O'], required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    governmentId: { type: String, required: true },
    ssn: { type: String },
    emergencyContact: { type: mongoose.Schema.Types.ObjectId, ref: 'EmergencyContact', required: true }
}, { timestamps: true, _id : false });

// Pre-save hook for auto-incrementing `patientId`
patientSchema.pre('save', async function (next) {
    if (this.isNew) {
        this._id = await getNextSequenceValue('Patient', '_id');
    }
    next();
});

const patient: Model<IPatient> = mongoose.models.Patient || mongoose.model<IPatient>("Patient", patientSchema);
export default patient;