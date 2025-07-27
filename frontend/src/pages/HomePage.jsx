import React, { useState, useEffect, useCallback } from "react";
import SweetCard from "../components/SweetCard";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
	const [sweets, setSweets] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const navigate = useNavigate();

	// state for search and filter
	const [searchTerm, setSearchTerm] = useState("");
	const [category, setCategory] = useState("");

	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
		}, 1000);

		return () => {
			clearTimeout(timerId);
		};
	}, [searchTerm]);

	const handleLogout = useCallback(() => {
		localStorage.removeItem("authToken");
		navigate("/login");
	}, [navigate]);

	const fetchSweets = useCallback(async () => {
		setIsLoading(true);
		setError("");

		const token = localStorage.getItem("authToken");
		if (!token) {
			handleLogout();
			setIsLoading(false);
			return;
		}

		let url = "/api/sweets";
		const params = new URLSearchParams();
		if (debouncedSearchTerm) params.append("name", debouncedSearchTerm);
		if (category) params.append("category", category);

		const queryString = params.toString();
		if (queryString) {
			url = `api/sweets/search?${queryString}`;
		}

		try {
			const response = await fetch(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				const errorData = await response
					.json()
					.catch(() => ({ error: "An unexpected error occurred." }));
				throw new Error(errorData?.error);
			}

			const data = await response.json();
			setSweets(data.data);
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	}, [debouncedSearchTerm, category, handleLogout]);

	useEffect(() => {
		fetchSweets();
	}, [fetchSweets]);

	const handlePurchase = async (sweetId) => {
		const token = localStorage.getItem("authToken");
		setSuccessMessage("");
		setError("");

		try {
			const response = await fetch(`/api/sweets/${sweetId}/purchase`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);
				throw new Error(errorData?.error || "Purchase failed.");
			}

			const updatedSweet = await response.json();
			setSuccessMessage(
				`Successfully purchased ${updatedSweet.data.name}!`
			);

			await fetchSweets();
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 font-sans">
			{/* Header */}
			<header className="bg-white shadow-md sticky top-0 z-10">
				<nav className="container mx-auto px-6 py-4 flex justify-between items-center">
					<h1 className="text-3xl font-bold text-purple-600">
						Sweet Shop
					</h1>
					<button
						className="py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition"
						onClick={handleLogout}
					>
						Logout
					</button>
				</nav>
			</header>

			{/* Main Content */}
			<main className="container mx-auto px-6 py-8">
				<div className="text-center mb-12">
					<h2
						className="text-4xl font-bold text-gray-800"
						data-aos="fade-down"
					>
						Our Delicious Sweets
					</h2>
					<p
						className="text-gray-500 mt-2"
						data-aos="fade-down"
						data-aos-delay="100"
					>
						Find your favorite treats
					</p>
				</div>

				{/* Search and Filter Section */}
				<div
					className="mb-8 p-6 bg-white rounded-xl shadow-md"
					data-aos="fade-up"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<input
							type="text"
							placeholder="Search for a sweet..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition"
						/>
						<select
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition"
						>
							<option value="">All Categories</option>
							<option value="Barfi">Barfi</option>
							<option value="Syrupy">Syrupy</option>
							<option value="Fried">Fried</option>
							<option value="Milk-based">Milk-based</option>
							<option value="Laddu">Laddu</option>
							<option value="Flaky">Flaky</option>
							<option value="Halwa">Halwa</option>
						</select>
					</div>
				</div>

				{successMessage && (
					<p className="text-center text-green-600 bg-green-100 p-4 rounded-lg mb-4">
						{successMessage}
					</p>
				)}

				{error && (
					<p className="text-center text-red-500 bg-red-100 p-4 rounded-lg mb-4">
						{error}
					</p>
				)}
				{isLoading && (
					<p className="text-center text-gray-500">
						Loading sweets...
					</p>
				)}

				{!isLoading && !error && sweets.length > 0 && (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
						{sweets.map((sweet) => (
							<SweetCard
								key={sweet._id}
								sweet={sweet}
								onPurchase={handlePurchase}
							/>
						))}
					</div>
				)}
				{!isLoading && !error && sweets.length === 0 && (
					<p className="text-center text-gray-500 mt-12">
						No sweets found. Try adjusting your search!
					</p>
				)}
			</main>
		</div>
	);
};

export default DashboardPage;
