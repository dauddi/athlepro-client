import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateProfileWrapper from "./components/containers/CreateProfileWrapper";
import AthleteProfilesWrapper from "./components/containers/AthleteProfilesWrapper";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <AthleteProfilesWrapper />,
			},
			{
				path: "/create-profile",
				element: <CreateProfileWrapper />,
			},
		],
	},
]);

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
