import React, { useRef, useEffect, useState } from "react";
import { message } from "antd";
import Loading from "@/components/Loading";
import { DownloadOutlined } from "@ant-design/icons";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import style from "./index.module.css";

const Preview: React.FC = () => {
	const iframeRef = useRef<HTMLIFrameElement | null>(null);
	const iframeDocRef = useRef<Document | null>(null); // 用于保存 iframe 的 document
	const [isLoading, setIsLoading] = useState<boolean>(true);
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
			console.log("iframe loaded");
			setTimeout(() => {
				// 纯粹是为了防止加载太快一闪而过不好看
				setIsLoading(false);
			}, 1500);
		};

		iframe.addEventListener("load", handleLoad);
		// 清理事件监听器
		return () => {
			iframe.removeEventListener("load", handleLoad);
		};
	}, []);

	const setStaticSource = () => {
		switch (template) {
			case "DarkLight":
				return [
					{
						path: "font/basheqvintagedemoversionregular-ov13x.ttf",
						url: `/template/${template}/font/basheqvintagedemoversionregular-ov13x.ttf`,
					},
					{
						path: "font/juviyademo-3lw5l.ttf",
						url: `/template/${template}/font/juviyademo-3lw5l.ttf`,
					},
					{
						path: "media/Background.webp",
						url: `/template/${template}/media/Background.webp`,
					},
					{
						path: "media/Foreground.webp",
						url: `/template/${template}/media/Foreground.webp`,
					},
					{ path: "css/index.css", url: `/template/${template}/css/index.css` },
					{ path: "js/index.js", url: `/template/${template}/js/index.js` },
				];
		}
		return [];
	};

	const handleDownload = async () => {
		const doc = iframeDocRef.current;
		if (!doc) {
			messageApi.error("加载还未完成，请稍后再试");
			return;
		}

		const zip = new JSZip();
		// 获取 iframe 中完整的 HTML 内容
		const htmlContent = doc.documentElement.outerHTML;
		// 使用 DOMParser 移除无用的脚本标签
		const parser = new DOMParser();
		const parsedDoc = parser.parseFromString(htmlContent, "text/html");
		const targetScripts = parsedDoc.querySelectorAll("script[async]");
		targetScripts.forEach((script) => script.remove());
		const modifiedHTML = parsedDoc.documentElement.outerHTML;
		zip.file("index.html", modifiedHTML);
		const resources = setStaticSource();
		try {
			setIsLoading(true);
			// 并行获取所有资源
			await Promise.all(
				resources.map(async (resource) => {
					try {
						const response = await fetch(resource.url);
						if (!response.ok) {
							throw new Error(`无法获取 ${resource.url}`);
						}
						const content = await response.arrayBuffer();
						zip.file(resource.path, content);
					} catch (error) {
						console.error(`资源下载失败: ${resource.url}`, error);
					}
				})
			);
			// 生成 zip 文件
			const content = await zip.generateAsync({ type: "blob" });
			saveAs(
				content,
				`PIPG-${template}-${new Date().toISOString().split("T")[0]}.zip`
			);
		} catch (e) {
			console.error("生成 zip 文件失败:", e);
			messageApi.error("生成压缩包失败，请重试");
		} finally {
			setTimeout(() => {
				// 纯粹是为了防止加载太快一闪而过不好看
				setIsLoading(false);
			}, 2000);
		}
	};

	return (
		<>
			{contextHolder}
			{isLoading && <Loading />}
			<div
				className={style.container}
				style={{ display: isLoading ? "none" : "block" }}
			>
				<iframe
					ref={iframeRef}
					title="Preview"
					src={`/template/${template}/index.html`}
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						border: "none", // 移除边框
						zIndex: 99,
					}}
				/>
				<button
					className={style.floatButton}
					onClick={handleDownload}
					title="下载"
				>
					<DownloadOutlined />
				</button>
			</div>
		</>
	);
};

export default Preview;
