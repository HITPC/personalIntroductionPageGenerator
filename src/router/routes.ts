import { lazy } from "react";

// 懒加载组件
const IndexView = lazy(() => import("@/views/Index"));
const EditView = lazy(() => import("@/views/DataEdit"));
const PreviewView = lazy(() => import("@/views/Preview"));
const NotFoundView = lazy(() => import("@/views/NotFound"));
const PlaygroundView = lazy(() => import("@/views/Playground"));

const routes = [
	{
		path: "/",
		name: "index",
		element: IndexView,
	},
	{
		path: "/edit",
		name: "dataedit",
		element: EditView,
	},
	{
		path: "/preview",
		name: "preview",
		element: PreviewView,
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
