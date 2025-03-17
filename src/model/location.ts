import mongoose, {Model, Schema, Types} from "mongoose";

interface ILocation {
    roomNum: number;
    bedNumber: string;
    locationType: Types.ObjectId;
    condition: string;
    createdAt?: Date;
    updatedAt?: Date;
}


const locationSchema:Schema<ILocation> = new mongoose.Schema({
    roomNum: { type: Number, required: true },
    bedNumber: { type: String, required: true },
    locationType: { type: mongoose.Schema.Types.ObjectId, ref: 'LocationType', required: true },
    condition: { type: String, required: true }
}, { timestamps: true });

const location:Model<ILocation> = mongoose.model("Location", locationSchema);

module.exports = location;