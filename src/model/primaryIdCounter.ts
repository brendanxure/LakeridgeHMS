import mongoose from 'mongoose';

// Function to get the next incrementing value for a field
export async function getNextSequenceValue(modelName: string, field: string): Promise<number> {
    const counter = await mongoose?.connection?.db?.collection('counters').findOneAndUpdate(
        { model: modelName, field: field },
        { $inc: { sequence_value: 1 } },
        { returnDocument: 'after', upsert: true }
    );
    return counter?.sequence_value || 1;
}
