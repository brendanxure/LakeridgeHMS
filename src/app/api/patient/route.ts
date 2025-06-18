import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/config/mongoDBConnection";
import { getNextSequenceValue } from "@/model/primaryIdCounter";
import Patient from "../../../model/patient";

export async function POST(req: Request, res: Response) {
  try {
    await connectDB();
    const body = await req.json();
    if(!body._id){
      body._id = await getNextSequenceValue("Patient", "_id");
    }
    const response = await Patient.create(body);
    response.save();
    return NextResponse.json({success: true, data: response, status: 200});
  }catch(err){
    return NextResponse.json({success: false, error: err});
  }
}

export async function GET(req:NextRequest,res:NextResponse){
  try{

  }catch(err){

  }
}