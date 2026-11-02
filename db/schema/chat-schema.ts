import { model, models, Schema, Types } from "mongoose";

export interface ChatMessage {
	role: "user" | "assistant";
	content: string;
}

export interface Chat {
	userId: String;
	chatHistory: ChatMessage[];
	chatName: string;
	pdfs: { name: string; link: string }[];
}

const chatMessageSchema = new Schema<ChatMessage>(
	{
		role: { type: String, enum: ["user", "assistant"], required: true },
		content: { type: String, required: true },
	},
	{ _id: false },
);

const pdfSchema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		link: { type: String, required: true, trim: true },
	},
	{ _id: false },
);

const chatSchema = new Schema<Chat>(
	{
		userId: { type: String, ref: "User", required: true },
		chatHistory: { type: [chatMessageSchema], default: [] },
		chatName: { type: String, required: true, trim: true },
		pdfs: { type: [pdfSchema], default: [] },
	},
	{ timestamps: true },
);

const ChatModel = models.Chat || model<Chat>("Chat", chatSchema);

export default ChatModel;
