import RouterView from "@/router/components/RouterView";
import { ConfigProvider } from "antd";

function App() {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "#222",
					colorPrimaryHover: "#222",
				},
				components: {
					Input: {
						activeShadow: "none",
					},
				},
			}}
		>
			<RouterView />
		</ConfigProvider>
	);
}

export default App;
