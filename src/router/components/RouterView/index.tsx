import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "../Loading";
import routes from "../../routes";

export default function RouterView() {
	return (
		<Router>
			<Suspense fallback={<Loading />}>
				<Routes>
					{routes.map((item, index) => (
						<Route key={index} path={item.path} element={<item.element />} />
					))}
				</Routes>
			</Suspense>
		</Router>
	);
}
