import mongoose, {Model, Schema, Types} from "mongoose";

interface IPrescription {
    prescribedFor: Types.ObjectId;
    itemCode: string;
    dosage: string;
    formulation: string;
    roa: string;
    strength: string;
    quantity: number;
    refills: number;
    startDate: Date;
    endDate: Date;
    specialInstruction?: string;
    prescribedBy: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const prescriptionSchema:Schema<IPrescription> = new mongoose.Schema({
    prescribedFor: { type: mongoose.Schema.Types.ObjectId, ref: 'PatientVisit', required: true },
    itemCode: { type: String, required: true },
    dosage: { type: String, required: true },
    formulation: { type: String, required: true },
    roa: { type: String, required: true },
    strength: { type: String, required: true },
    quantity: { type: Number, required: true },
    refills: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    specialInstruction: { type: String },
    prescribedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Physician', required: true }
}, { timestamps: true });

const prescription:Model<IPrescription> = mongoose.model("Prescription", prescriptionSchema);

module.exports = prescription;
