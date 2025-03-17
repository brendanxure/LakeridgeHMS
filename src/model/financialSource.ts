import mongoose, {Model, Schema} from "mongoose";


interface IFinancialSource {
    _id: string;
    name: string;
}

const financialSourceSchema: Schema<IFinancialSource> = new mongoose.Schema(
    {
        _id: { type: String, required: true, unique: true },
        name: { type: String, required: true }
    },
    {
        timestamps: true,
        _id: false
    }
);

const financialSource: Model<IFinancialSource> = mongoose.model("FinancialSource", financialSourceSchema);

module.exports = financialSource;