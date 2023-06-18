import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET (read)
export const GET = async (req, { params }) => {
	try {
		await connectToDB();

		const prompt = await Prompt.findById(params.id).populate("creator");
		if (!prompt) return new Response("Prompt not found", { status: 404 });

		return new Response(JSON.stringify(prompt), { status: 200 });
	} catch (error) {
		return new Response("Failed to fetch prompt", { status: 500 });
	}
};

// PATCH (update)
export const PATCH = async (req, { params }) => {
	const { prompt, tag } = await req.json();

	try {
		await connectToDB();
		const updatedPrompt = await Prompt.findByIdAndUpdate(params.id, {
			prompt,
			tag,
		});
		if (!updatedPrompt)
			return new Response("Prompt not found", { status: 404 });
		return new Response(JSON.stringify(updatedPrompt), { status: 200 });
	} catch (error) {
		return new Response("Failed to update prompt", { status: 500 });
	}
};

// DELETE (delete)
export const DELETE = async (req, { params }) => {
	try {
		await connectToDB();
		const deletedPrompt = await Prompt.findByIdAndDelete(params.id);
		if (!deletedPrompt)
			return new Response("Prompt not found", { status: 404 });
		return new Response(JSON.stringify(deletedPrompt), { status: 200 });
	} catch (error) {
		return new Response("Failed to delete prompt", { status: 500 });
	}
};
