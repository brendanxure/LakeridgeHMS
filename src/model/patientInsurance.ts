import mongoose,{Types, Model, Schema} from "mongoose";

interface IPatientInsurance{
    financialSource: Types.ObjectId;
    patient: Types.ObjectId;
    policyNumber: string;
    groupNumber: string;
    primaryInsuranceHolder?: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const patientInsuranceSchema:Schema<IPatientInsurance> = new mongoose.Schema({
    financialSource: { type: mongoose.Schema.Types.ObjectId, ref: 'FinancialSource', required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    policyNumber: { type: String, required: true },
    groupNumber: { type: String, required: true },
    primaryInsuranceHolder: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }
}, { timestamps: true });

const patientInsurance: Model<IPatientInsurance> = mongoose.model("PatientInsurance", patientInsuranceSchema);

module.exports = patientInsurance;