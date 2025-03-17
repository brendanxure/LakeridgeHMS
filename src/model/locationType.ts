import mongoose, {Model, Schema} from "mongoose";

interface ILocationType {
    _id: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const locationTypeSchema:Schema<ILocationType> = new mongoose.Schema({
    _id: { type: String, required: true, unique: true },
    name: { type: String, required: true }
}, { timestamps: true, _id: false });

const locationType:Model<ILocationType> = mongoose.model("LocationType", locationTypeSchema);

module.exports = locationType;