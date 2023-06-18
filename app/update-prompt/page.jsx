"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const promptId = searchParams.get("id");
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: "",
		tag: "",
	});

	useEffect(() => {
		async function getPromptDetails() {
			const response = await fetch(`/api/prompt/${promptId}`);
			const data = await response.json();

			setPost(data);
		}

		if (promptId) getPromptDetails();
	}, [promptId]);

	const updatePrompt = async (e) => {
		e.preventDefault();
		if (!promptId) return alert("Prompt ID not found");

		setSubmitting(true);
		try {
			const response = await fetch(`/api/prompt/${promptId}`, {
				method: "PATCH",
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag.replace("#", "").replace(" ", ""),
				}),
			});

			if (response.ok) {
				router.push("/");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Form
			type="Edit"
			onSubmit={updatePrompt}
			submitting={submitting}
			post={post}
			setPost={setPost}
		/>
	);
};

export default UpdatePrompt;
