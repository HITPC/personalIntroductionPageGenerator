import { lazy } from "react";

// 懒加载组件
const IndexView = lazy(() => import("@/views/Index"));
const NotFoundView = lazy(() => import("@/views/NotFound"));
const PlaygroundView = lazy(() => import("@/views/Playground"));

const routes = [
	{
		path: "/",
		name: "index",
		element: IndexView,
	},
	{
		path: "/playground",
		name: "playground",
		element: PlaygroundView,
	},
	{
		path: "*",
		name: "404",
		element: NotFoundView,
	},
];

export default routes;
