"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import Loading from "./Loading";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		setTimeout(() => setShow(true), 1500);
	}, []);

	return (
		<section className="w-full">
			<h1 className="head_text text-left">
				<span className="blue_gradient">{name} Profile</span>
			</h1>
			<p className="desc text-left">{desc}</p>

			{!data.length && !show ? (
				<Loading />
			) : (
				<div className="mt-10 prompt_layout">
					{data.map((post) => (
						<PromptCard
							key={post?._id}
							post={post}
							handleEdit={() => handleEdit && handleEdit(post)}
							handleDelete={() => handleDelete && handleDelete(post)}
						/>
					))}
				</div>
			)}
		</section>
	);
};

export default Profile;
