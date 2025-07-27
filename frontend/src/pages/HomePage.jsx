import React, { useState, useEffect } from "react";
import SweetCard from "../components/SweetCard";

const DashboardPage = () => {
	const [sweets, setSweets] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchSweets = async () => {
			setIsLoading(true);
			setError("");

			const token = localStorage.getItem("authToken");
			if (!token) {
				setError("You are not authorized. Please log in.");
				setIsLoading(false);
				return;
			}

			try {
				const response = await fetch("/api/sweets", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					const errorData = await response.json().catch(() => null);
					throw new Error(
						errorData?.error || "Failed to fetch sweets."
					);
				}

				const data = await response.json();
				setSweets(data.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchSweets();
	}, []);

	return (
		<div className="min-h-screen bg-gray-100 font-sans">
			{/* Header */}
			<header className="bg-white shadow-md sticky top-0 z-10">
				<nav className="container mx-auto px-6 py-4 flex justify-between items-center">
					<h1 className="text-3xl font-bold text-purple-600">
						Sweet Shop
					</h1>
					<button className="py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition">
						Logout
					</button>
				</nav>
			</header>

			{/* Main Content */}
			<main className="container mx-auto px-6 py-8">
				<h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
					Our Delicious Sweets
				</h2>

				{isLoading && (
					<p className="text-center text-gray-500">
						Loading sweets...
					</p>
				)}
				{error && (
					<p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">
						{error}
					</p>
				)}

				{!isLoading && !error && (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
						{sweets.map((sweet) => (
							<SweetCard key={sweet._id} sweet={sweet} />
						))}
					</div>
				)}
			</main>
		</div>
	);
};

export default DashboardPage;
