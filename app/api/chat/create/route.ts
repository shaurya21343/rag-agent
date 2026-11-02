import { connectDB } from "@/db/connect";
import { auth } from "@clerk/nextjs/server";
import chatSchema from "@/db/schema/chat-schema";

export async function POST(request: Request) {
	const { userId } = await auth();
	if (!userId) {
		return Response.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const body = await request.json();

		if (!body || typeof body !== "object" || Array.isArray(body)) {
			return Response.json({ error: "Invalid chat data" }, { status: 400 });
		}

		await connectDB();

		const validatedChat = new chatSchema({
			...body,
			id: crypto.randomUUID(),
			userId,
			createdAt: new Date(),
		});
		await validatedChat.validate();
		await validatedChat.save();

		return Response.json(
			{ message: "Chat created", data: validatedChat.toObject() },
			{ status: 201 }
		);
	} catch (error: unknown) {
		return Response.json(
			{ error: error instanceof Error ? error.message : "Something went wrong" },
			{ status: 400 }
		);
	}
}
