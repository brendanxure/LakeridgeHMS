import mongoose, {Schema, Model, Types} from "mongoose";

interface IPhysicianHistory{
    physician: Types.ObjectId;
    startDate: Date;
    endDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

const physicianHistorySchema: Schema<IPhysicianHistory> = new mongoose.Schema({
    physician: { type: mongoose.Schema.Types.ObjectId, ref: 'Physician', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date }
}, { timestamps: true });

const physicianHistory: Model<IPhysicianHistory> = mongoose.model("PhysicianHistory", physicianHistorySchema);

module.exports = physicianHistory;