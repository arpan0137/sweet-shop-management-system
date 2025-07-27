import { useEffect } from "react";
import "./App.css";
import AOS from "aos";
import LoginPage from "./pages/LoginPage";

function App() {
	useEffect(() => {
		AOS.init({
			duration: 1000,
			once: true,
		});
	}, []);

	return <LoginPage />;
}

export default App;
