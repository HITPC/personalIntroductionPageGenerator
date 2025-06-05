import RouterView from "@/router/components/RouterView";
import locale from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";

function App() {
	dayjs.locale("zh-cn");
	return (
		<ConfigProvider
			locale={locale}
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
					Select: {
						selectorBg: "transparent",
						optionSelectedColor: "#fff",
						activeOutlineColor: "transparent",
					},
				},
			}}
		>
			<RouterView />
		</ConfigProvider>
	);
}

export default App;
