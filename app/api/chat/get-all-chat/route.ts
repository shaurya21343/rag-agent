import { connectDB } from "@/db/connect";
import { auth } from "@clerk/nextjs/server";
import chatSchema from "@/db/schema/chat-schema";


export async function POST(request: Request) {
    const { userId } = await auth();
    if (!userId) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectDB();
        const chats = await chatSchema.find({ userId });
        return Response.json({ data: chats });
    } catch (error) {
        return Response.json({ error: "Something went wrong" }, { status: 500 });
    }
}
