import AppLayout from "./components/layout/AppLayout";
import { Outlet } from "react-router-dom";

function App() {
	return (
		<AppLayout>
			<Outlet />
		</AppLayout>
	);
}

export default App;
