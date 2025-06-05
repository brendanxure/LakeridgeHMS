import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/config/mongoDBConnection";

export async function GET(req: Request, res: Response) {
  try {
    await connectDB();
  }catch(err){
    console.log(err);
  }
}