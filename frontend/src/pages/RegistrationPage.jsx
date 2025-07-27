import React, { useState, useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

const RegistrationPage = () => {
	// State for form inputs
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// State for handling API call status
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// Initialize AOS animations
	useEffect(() => {
		AOS.init({
			duration: 1000,
			once: true,
		});
	}, []);

	// Handle form submission
	const handleRegister = async (e) => {
		e.preventDefault();
		// Frontend validation
		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		setIsLoading(true);
		setError("");
		setSuccess("");

		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json().catch(() => null);

			if (!response.ok) {
				throw new Error(
					data?.error || "Registration failed. Please try again."
				);
			}

			setSuccess("Registration successful! Please log in.");
			// Clear form fields on success
			setUsername("");
			setPassword("");
			setConfirmPassword("");
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-300 via-pink-300 to-orange-300 flex items-center justify-center p-4 font-sans">
			<div
				className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-6"
				data-aos="fade-up"
			>
				<div className="text-center">
					<h1 className="text-4xl font-bold text-gray-800">
						Create an Account
					</h1>
					<p className="text-gray-500 mt-2">
						Join us and start managing your sweets!
					</p>
				</div>

				{error && (
					<div
						className="text-red-600 text-center bg-red-100 p-3 rounded-lg"
						data-aos="zoom-in"
					>
						{error}
					</div>
				)}
				{success && (
					<div
						className="text-green-600 text-center bg-green-100 p-3 rounded-lg"
						data-aos="zoom-in"
					>
						{success}
					</div>
				)}

				<form onSubmit={handleRegister} className="space-y-4">
					<div>
						<label
							htmlFor="username"
							className="block text-sm font-medium text-gray-700"
						>
							Username
						</label>
						<input
							id="username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition"
							placeholder="Choose a username"
							disabled={isLoading}
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition"
							placeholder="Enter a secure password"
							disabled={isLoading}
						/>
					</div>

					<div>
						<label
							htmlFor="confirmPassword"
							className="block text-sm font-medium text-gray-700"
						>
							Confirm Password
						</label>
						<input
							id="confirmPassword"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition"
							placeholder="Confirm your password"
							disabled={isLoading}
						/>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full flex justify-center py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition transform hover:scale-105 disabled:bg-purple-400 disabled:cursor-not-allowed"
					>
						{isLoading ? "Registering..." : "Sign Up"}
					</button>
				</form>

				<p className="text-center text-sm text-gray-600">
					Already have an account?{" "}
					<a
						href="#"
						className="font-medium text-purple-600 hover:text-purple-500"
					>
						Log In
					</a>
				</p>
			</div>
		</div>
	);
};

export default RegistrationPage;
