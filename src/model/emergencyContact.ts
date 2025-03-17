import mongoose, {Model, Schema, Types} from "mongoose";
import {getNextSequenceValue} from "./primaryIdCounter";

interface IEmergencyContact {
    _id: Number;
    firstName: string;
    lastName: string;
    relationship: string;
    phoneNumber: string;
    alternateContact?: Types.ObjectId;
}

const emergencyContactSchema:Schema<IEmergencyContact> = new mongoose.Schema({
    _id: {type: Number, required: true, unique: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    relationship: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    alternateContact: { type: mongoose.Schema.Types.ObjectId, ref: 'AlternateContact' }
}, { timestamps: true, _id: false });

// Pre-save hook for auto-incrementing `emgContactId`
emergencyContactSchema.pre('save', async function (next) {
    if (this.isNew) {
        this._id = await getNextSequenceValue('EmergencyContact', '_id');
    }
    next();
});
const emergencyContact: Model<IEmergencyContact> = mongoose.models.EmergencyContact || mongoose.model<IEmergencyContact>("EmergencyContact", emergencyContactSchema);

export default emergencyContact;