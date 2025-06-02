// import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Loading from "../Loading";
import routes from "../../routes";

export default function RouterView() {
	return (
		<Router>
			{/* 因为加载太快了，所以考虑去掉这个suspense，不然每次都闪一下很难受 */}
			{/* <Suspense fallback={<Loading />}> */}
			<Routes>
				{routes.map((item, index) => (
					<Route key={index} path={item.path} element={<item.element />} />
				))}
			</Routes>
			{/* </Suspense> */}
		</Router>
	);
}
