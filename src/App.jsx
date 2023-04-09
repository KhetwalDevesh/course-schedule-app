import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<div className="App">
			<Toaster />
			{/* <Header /> */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/schedule" element={<Schedule />} />
			</Routes>
		</div>
	);
}

export default App;
