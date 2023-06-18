"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
	const { data: session } = useSession();

	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	useEffect(() => {
		(async function () {
			const response = await getProviders();

			setProviders(response);
		})();
	}, []);
	return (
		<nav className="flex-between w-full mb-16 pt-3">
			<Link href={"/"} className="flex gap-2 flex-center">
				<Image
					src={"/assets/images/logo.svg"}
					width={30}
					height={30}
					alt="Promptopia logo"
					className="object-contain"
				/>
				<h1 className="logo_text">Promptopia</h1>
			</Link>

			{/* Desktop Navigation */}
			<div className="sm:flex hidden">
				{session?.user ? (
					<div className="flex gap-2">
						<Link href={"/create-prompt"} className="black_btn">
							Create Post
						</Link>
						<button type="button" className="outline_btn" onClick={signOut}>
							Sign Out
						</button>
						<Link href={"/profile"}>
							<Image
								src={session?.user.image}
								width={37}
								height={37}
								alt="Profile"
								className="rounded-full"
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => signIn(provider.id, { callbackUrl: "/" })}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>

			{/* Mobile Navigation */}
			<div className="sm:hidden flex relative">
				{session?.user ? (
					<div className="flex">
						<Image
							src={session?.user.image}
							width={37}
							height={37}
							alt="Profile"
							className="rounded-full"
							onClick={() => setToggleDropdown((prev) => !prev)}
						/>

						{toggleDropdown && (
							<div className="dropdown">
								<Link
									href={"/profile"}
									onClick={() => setToggleDropdown(false)}
									className="dropdown_link"
								>
									My Profile
								</Link>
								<Link
									href={"/create-prompt"}
									onClick={() => setToggleDropdown(false)}
									className="dropdown_link"
								>
									Create Prompt
								</Link>
								<button
									className="outline_btn"
									type="button"
									onClick={() => {
										setToggleDropdown(false);
										signOut();
									}}
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => signIn(provider.id, { callbackUrl: "/" })}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
