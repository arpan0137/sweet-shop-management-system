import React, { useState, useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

const LoginPage = () => {
	// State for form inputs
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// State for handling API call status
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// Initialize AOS animations
	useEffect(() => {
		AOS.init({
			duration: 1000,
			once: true,
		});
	}, []);

	// Handle form submission
	const handleLogin = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			if (!response.ok) {
				// Try to get error message from JSON body, otherwise use status text
				const errorData = await response.json().catch(() => null); // Gracefully handle non-JSON responses
				throw new Error(
					errorData?.error ||
						response.statusText ||
						"An unknown error occurred"
				);
			}

			// Check content type before parsing JSON
			const contentType = response.headers.get("content-type");
			if (contentType && contentType.indexOf("application/json") !== -1) {
				const data = await response.json();
				// On successful login, save the token and handle redirection
				console.log("Login successful:", data);
				localStorage.setItem("authToken", data.token);
				// Here you would typically redirect the user or update the app's auth state
				// e.g., window.location.href = '/dashboard';
			} else {
				// Handle non-JSON responses if necessary, or assume success without data
				console.log("Login successful, but no JSON response.");
			}
		} catch (err) {
			setError(err.message);
		} finally {
			// Ensure loading is set to false after the API call completes
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center p-4 font-sans">
			<div
				className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-6"
				data-aos="fade-up"
			>
				<div className="text-center">
					<h1 className="text-4xl font-bold text-gray-800">
						Welcome Back!
					</h1>
					<p className="text-gray-500 mt-2">
						Log in to manage your sweet shop
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

				<form onSubmit={handleLogin} className="space-y-6">
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
							placeholder="Enter your username"
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
							placeholder="Enter your password"
							disabled={isLoading}
						/>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full flex justify-center py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition transform hover:scale-105 disabled:bg-purple-400 disabled:cursor-not-allowed"
					>
						{isLoading ? "Logging In..." : "Log In"}
					</button>
				</form>

				<p className="text-center text-sm text-gray-600">
					Don't have an account?{" "}
					<a
						href="#"
						className="font-medium text-purple-600 hover:text-purple-500"
					>
						Register
					</a>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
