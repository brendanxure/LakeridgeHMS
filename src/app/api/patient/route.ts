import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/config/mongoDBConnection";

export async function GET(req: Request, res: Response) {
  try {
    await connectDB();
    const body = await req.json();
  }catch(err){
    console.log(err);
  }
}