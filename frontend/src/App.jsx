import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import AOS from "aos";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import HomePage from "./pages/HomePage";

function App() {
	useEffect(() => {
		AOS.init({
			duration: 1000,
			once: true,
		});
	}, []);

	return (
		<Router>
			<Routes>
				{/* The default route redirects to the login page */}
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<HomePage />
						</ProtectedRoute>
					}
				/>

				{/* Route for the login page */}
				<Route path="/login" element={<LoginPage />} />

				{/* Route for the registration page */}
				<Route path="/register" element={<RegistrationPage />} />

				{/* Later, we will add protected routes for the dashboard here */}
			</Routes>
		</Router>
	);
}

export default App;
