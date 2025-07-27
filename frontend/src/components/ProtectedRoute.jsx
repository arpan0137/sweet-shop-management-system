import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	const token = localStorage.getItem("authToken");

	if (!token) {
		// If no token is found, redirect to the login page
		return <Navigate to="/login" replace />;
	}

	// If a token exists, render the child component (the protected page)
	return children;
};

export default ProtectedRoute;
