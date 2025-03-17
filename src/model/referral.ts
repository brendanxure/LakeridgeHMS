import mongoose, {Types, Model, Schema} from "mongoose";

interface IReferral {
    visit: Types.ObjectId;
    referrer: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const referralSchema:Schema<IReferral> = new mongoose.Schema({
    visit: { type: mongoose.Schema.Types.ObjectId, ref: 'PatientVisit', required: true },
    referrer: { type: mongoose.Schema.Types.ObjectId, ref: 'Physician', required: true }
}, { timestamps: true });

const referral: Model<IReferral> = mongoose.model("Referral", referralSchema);

module.exports = referral;
