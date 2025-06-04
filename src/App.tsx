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
						activeBg: "transparent",
						hoverBg: "transparent",
					},
					DatePicker: {
						activeShadow: "none",
						activeBg: "transparent",
						hoverBg: "transparent",
					},
				},
			}}
		>
			<RouterView />
		</ConfigProvider>
	);
}

export default App;
