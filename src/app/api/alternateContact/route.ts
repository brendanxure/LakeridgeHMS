

import { NextRequest, NextResponse } from "next/server";
import AlternateContact, { IAlternateContact } from "@/model/alternateContact";
import connectDB from "@/config/mongoDBConnection";
import { getNextSequenceValue } from "@/model/primaryIdCounter";


export async function POST (request:NextRequest) {
    try {
      const body:IAlternateContact  = await request.json();
      await connectDB();
      if(!body._id){
        body._id  = await getNextSequenceValue('AlternateContact', '_id');
        console.log(body._id);
      }
      console.log(body);
      const newPost = await AlternateContact.create(body);
      return NextResponse.json({ success: true, data: newPost }, { status: 201 });
    }catch(err){
      return NextResponse.json({ success: false, error: err }, { status: 500 });
    }
}

export async function GET (request:NextRequest, response:NextResponse) {
    try{
      await connectDB();
      const {searchParams} = new URL(request.url);
      const id = searchParams.get("id");
      const firstName = searchParams.get("firstName");
      const lastName = searchParams.get("lastName");

      const query:any = {};
      if(id){
        query["_id"] = id;
      }
      if(firstName){
        query["firstName"] = firstName;
      }
      if(lastName){
        query["lastName"] = lastName;
      }

      if(query){
        const contact = await AlternateContact.find(query);
        return NextResponse.json({success: true, data: contact}, {status:201});
      }

      const getAllContacts = await AlternateContact.find();
      return NextResponse.json({success: true, data: getAllContacts}, {status: 201});
    }catch(err){
      return NextResponse.json({success: false, error: err,})
    }
}



export async function PUT (request:Request, response:Response) {
  try{
    await connectDB();
    const {_id, ...updateContact}:IAlternateContact = await request.json();
    if(!_id){
      return NextResponse.json({ success: false, error: "No Id in the contact" });
    }
    const updatedContact = await AlternateContact.findByIdAndUpdate(_id, updateContact, {new: true});
    return NextResponse.json({success: true, data: updatedContact}, {status: 201})
  }catch(err){
    return NextResponse.json({ success: false, error: err,})
  }
}

export async function DELETE (request:Request, response:Response) {
  try{
    await connectDB();
    const {_id, ...updateContact}:IAlternateContact = await request.json();
    if(!_id){
      return NextResponse.json({ success: false, error: "No Id in the contact" });
    }
    const deletedContact = await AlternateContact.findByIdAndDelete(_id);
    return NextResponse.json({success: true, data: "Deleted from the contact" }, {status:201});
  }catch (err){
    return NextResponse.json({ success: false, error: err})
  }
}