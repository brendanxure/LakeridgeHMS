import mongoose, {Document, Model, Types, Schema} from "mongoose";

interface IPatientVisit{
    patient: Types.ObjectId;
    reason: string;
    admittedTimestamp?: Date;
    dischargedTimestamp?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

const patientVisitSchema:Schema<IPatientVisit> = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    reason: { type: String, required: true },
    admittedTimestamp: { type: Date, default: Date.now },
    dischargedTimestamp: { type: Date }
}, { timestamps: true });

const patientVisit: Model<IPatientVisit> = mongoose.model("PatientVisit", patientVisitSchema);

module.exports = patientVisit;
