"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Profile from "@components/Profile";

const ProfilePage = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		if (session?.user.id) {
			fetchPosts();
		} else {
			redirect("/");
		}
		async function fetchPosts() {
			const response = await fetch(`/api/users/${session?.user.id}/posts`);
			const data = await response.json();
			console.log(data);

			setPosts(data);
		}
	}, [session?.user.id]);

	const handleEdit = async (post) => {
		router.push(`/update-prompt?id=${post?._id}`);
	};
	const handleDelete = async (post) => {
		const hasConfirmed = confirm(
			"Are you sure you want to delete this prompt?"
		);

		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${post?._id.toString()}`, { method: "DELETE" });

				const filteredPosts = posts.filter(
					(each) => each?._id.toString() !== post?._id.toString()
				);

				setPosts(filteredPosts);
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<Profile
			name="My"
			desc="Welcome to your personalised page"
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default ProfilePage;
