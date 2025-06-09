import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/config/mongoDBConnection";
import { getNextSequenceValue } from "@/model/primaryIdCounter";
import Patient from "../../../model/patient";

export async function GET(req: Request, res: Response) {
  try {
    await connectDB();
    const body = await req.json();
    if(!body._id){
      body._id = await getNextSequenceValue("Patient", "_id");
    }
    const response = await Patient.create(body);
  }catch(err){
    console.log(err);
  }
}