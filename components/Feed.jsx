"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import Loading from "./Loading";

const PromptCardList = ({ data, handleTagClick }) => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		setTimeout(() => setShow(true), 1500);
	}, []);
	return (
		<div className="mt-16 prompt_layout">
			{!data.length && !show ? (
				<Loading />
			) : (
				<>
					<span className="blue_gradient text-center">
						{!data.length && "No prompts found."}
					</span>
					{data.map((post) => (
						<PromptCard
							key={post?._id}
							post={post}
							handleTagClick={handleTagClick}
						/>
					))}
				</>
			)}
		</div>
	);
};

const Feed = () => {
	const [searchText, setSearchText] = useState("");
	const [posts, setPosts] = useState([]);
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [filteredPosts, setFilteredPosts] = useState([]);

	const filterPrompts = (searchText) => {
		const regex = new RegExp(searchText, "i"); // i for case in-sensitive

		return posts.filter((post) => {
			return (
				regex.test(post.creator.username) ||
				regex.test(post.tag) ||
				regex.test(post.prompt)
			);
		});
	};

	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);

		setSearchTimeout(
			setTimeout(() => {
				setFilteredPosts(filterPrompts(e.target.value));
			}, 500)
		);
	};

	const handleTagClick = (tag) => {
		setSearchText(tag);
		setFilteredPosts(filterPrompts(tag));
	};

	useEffect(() => {
		(async function fetchPosts() {
			const response = await fetch("/api/prompt");
			const data = await response.json();

			setPosts(data);
		})();
	}, []);

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tag or a username"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>

			<PromptCardList
				data={searchText ? filteredPosts : posts}
				handleTagClick={handleTagClick}
			/>
		</section>
	);
};

export default Feed;
