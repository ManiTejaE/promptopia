"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Profile from "@components/Profile";

const DynamicProfilePage = ({ params }) => {
	const searchParams = useSearchParams();
	const username = searchParams.get("name");
	const router = useRouter();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		async function fetchPosts() {
			const response = await fetch(`/api/users/${params.id}/posts`);
			const data = await response.json();
			console.log(data);

			setPosts(data);
		}
		if (params.id) fetchPosts();
	}, [params.id]);

	return (
		<Profile
			name={username}
			desc={`Welcome to ${username} personalised profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination.`}
			data={posts}
		/>
	);
};

export default DynamicProfilePage;
