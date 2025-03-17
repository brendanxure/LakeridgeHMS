import mongoose, {Model, Schema} from "mongoose";
import {getNextSequenceValue} from "./primaryIdCounter";

export interface IAlternateContact{
    _id: number;
    firstName: string;
    lastName: string;
    relationship: string;
    phoneNumber: string;
}

const alternateContactSchema:Schema<IAlternateContact> = new mongoose.Schema({
    _id: {type: Number, required: true, unique: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    relationship: { type: String, required: true },
    phoneNumber: { type: String, required: true }
}, { timestamps: true, _id: false });

const alternateContact:Model<IAlternateContact> = mongoose.models.AlternateContact || mongoose.model<IAlternateContact>('AlternateContact', alternateContactSchema);

export default alternateContact;