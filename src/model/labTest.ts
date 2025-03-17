import mongoose, {Model, Schema, Types} from "mongoose";

interface ILabTest {
    patientVisit: Types.ObjectId;
    testName: string;
    testResult: string;
    performedBy: string;
    testDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

const labTestSchema:Schema<ILabTest> = new mongoose.Schema({
    patientVisit: { type: mongoose.Schema.Types.ObjectId, ref: 'PatientVisit', required: true },
    testName: { type: String, required: true },
    testResult: { type: String, required: true },
    performedBy: { type: String, required: true },
    testDate: { type: Date, required: true }
}, { timestamps: true });

const labTest:Model<ILabTest> = mongoose.model("LabTest", labTestSchema);

module.exports = labTest;