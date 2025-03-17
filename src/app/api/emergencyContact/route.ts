import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/config/mongoDBConnection";
import EmergencyContact from "@/model/emergencyContact";
import {getNextSequenceValue} from "@/model/primaryIdCounter";


export async function GET(req:NextRequest,res:NextResponse){
    try{
        await connectDB();
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        const firstName = searchParams.get("firstName");

        let query:{[keys: string]:string} = {}
        if(id){
            query["_id"] = id;
        }
        if(firstName){
            query["firstName"] = firstName;
        }
        if(query){
            const fetchData:{[keys: string]: string}[] = await EmergencyContact.find(query);
            return NextResponse.json({success:true, data:fetchData}, {status: 201});
        }
        const fetchAllData = await EmergencyContact.find();
        return NextResponse.json({success: true, data: fetchAllData}, {status:201});

    }catch(err){
        return NextResponse.json({success: false, error: err});
    }
}

export async function POST(req:NextRequest,res:NextResponse){
    try{
        await connectDB();
        const body = await req.json();
        if(!body._id){
            body._id = await getNextSequenceValue("EmergencyContact", "_id");
        }
        const response = await EmergencyContact.create(body);
        response.save();
        return NextResponse.json({success: true, data: response, status: 200});
    }catch (e) {
        return NextResponse.json({success: false, error: e});
    }
}

export async function PUT(req:NextRequest,res:NextResponse){
    try{
        await connectDB();
        const { _id, ...otherParts} = await req.json();
        if(!_id){
            return NextResponse.json({success: false, error: "Does not have an id please check the details correctly"}, {status: 401});
        }
        const updatedData = await EmergencyContact.findByIdAndUpdate(_id, otherParts, {new: true});
        return NextResponse.json({success: true, data: updatedData}, {status: 200})
    }catch(err){
        return NextResponse.json({success: false, error: err});
    }
}

export async function DELETE(req:NextRequest,res:NextResponse){
    try {
        await connectDB();
        const { _id, ...otherParts} = await req.json();
        const {searchParams} = new URL(req.url);
        const url_id = searchParams.get("id");
        if(url_id){
            const response = await EmergencyContact.findByIdAndDelete(url_id);
            if(response){
                return NextResponse.json({success: true, data: "Deleted from the DB"},{ status: 200});
            }
            return NextResponse.json({success: false, error: "No data with such id"}, {status: 401})
        }
        if(_id){
            const response = await EmergencyContact.findByIdAndDelete(_id);
            if(response){
                return NextResponse.json({success: true, data: "Deleted from the DB"}, {status: 200});
            }
            return NextResponse.json({success: false, error: "No data with such id"}, {status: 401});
        }
        return NextResponse.json({success: false, error: "Can not delete a contact that does not exist"}, {status: 401})
    } catch (err){
        return NextResponse.json({success: false, error: err});
    }
}

