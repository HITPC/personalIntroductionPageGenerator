import React, { useRef, useEffect } from "react";
import { message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import style from "./index.module.css";

const Preview: React.FC = () => {
	const iframeRef = useRef<HTMLIFrameElement | null>(null);
	const iframeDocRef = useRef<Document | null>(null); // 用于保存 iframe 的 document
	const search = window.location.search;
	const params = new URLSearchParams(search);
	const template = params.get("template");
	const [messageApi, contextHolder] = message.useMessage();

	useEffect(() => {
		const iframe = iframeRef.current;
		if (!iframe) return;

		const handleLoad = () => {
			const doc =
				iframe.contentDocument || iframe.contentWindow?.document || null;
			iframeDocRef.current = doc;
		};

		iframe.addEventListener("load", handleLoad);

		// 清理事件监听器
		return () => {
			iframe.removeEventListener("load", handleLoad);
		};
	}, []);

	const handleDownload = () => {
		const doc = iframeDocRef.current;
		if (!doc) {
			messageApi.error("加载还未完成，请稍后再试");
			return;
		}

		// 获取 iframe 中完整的 HTML 内容
		const htmlContent = doc.documentElement.outerHTML;

		// 创建 Blob 并生成下载链接
		const blob = new Blob([htmlContent], { type: "text/html" });
		const url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.href = url;
		a.download = `PIPG-${template}-${new Date().toISOString().split("T")[0]}.html`;
		a.style.display = "none";
		document.body.appendChild(a);
		a.click();

		// 清理
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return (
		<>
			{contextHolder}
			<div className={style.container}>
				<iframe
					ref={iframeRef}
					title="Preview"
					src={`/template/${template}.html`}
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						border: "none", // 移除边框
						zIndex: 99, // 确保 iframe 在最上层
					}}
				/>
				<button className={style.floatButton} onClick={handleDownload}>
					<DownloadOutlined />
				</button>
			</div>
		</>
	);
};

export default Preview;
