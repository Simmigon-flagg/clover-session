import Users from "../../../models/user";
import { connectToDatabase } from "../../../utils/database";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectToDatabase();

        const { email } = await request.json();

        if (!email || typeof email !== "string") {
            return NextResponse.json({ error: "Invalid email" }, { status: 400 });
        }

        const userExists = await Users.findOne({ email }).select("_id");
        return NextResponse.json({ exists: !!userExists });
    } catch (error) {
        
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
