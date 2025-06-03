import React, { useState } from "react";
import { Checkbox } from "antd";
import type { CheckboxOptionType, GetProp } from "antd";
import type { UserDataKey } from "@/types/userData";
import { useUserDataStore } from "@/store/userDataStore";
import style from "./index.module.css";

const Edit: React.FC = () => {
	const topTitleConfigs: CheckboxOptionType<string>[] = [
		{
			label: "基础信息",
			value: "basicData",
			disabled: true,
		},
		{
			label: "教育经历",
			value: "educationExperience",
			disabled: true,
		},
		{
			label: "掌握的技能与证书",
			value: "skillsAndCertifications",
			disabled: true,
		},
		{
			label: "所获奖项",
			value: "awards",
		},
		{
			label: "实习经历",
			value: "internshipExperience",
		},
		{
			label: "项目经历",
			value: "projectExperience",
		},
		{
			label: "作品展示",
			value: "worksShow",
		},
		{
			label: "自我评价",
			value: "descriptionAboutMe",
		},
		{
			label: "格言",
			value: "finalMotto",
		},
	];

	const [checkedTopTitle, setCheckedTopTitle] = useState<string[]>(
		topTitleConfigs.map((item) => item.value)
	);

	const handleTopTitleConfigsChange: GetProp<
		typeof Checkbox.Group,
		"onChange"
	> = (checkedValues) => {
		// 针对是哪一个值的变化来更新state 移除后变为空值
		setCheckedTopTitle(checkedValues as string[]);
	};

	const getTopTitleContent = (title: UserDataKey) => {
		switch (title) {
			case "basicData":
				return <div>{title}</div>;
			case "educationExperience":
				return <div>{title}</div>;
			case "skillsAndCertifications":
				return <div>{title}</div>;
			case "awards":
				return <div>{title}</div>;
			case "internshipExperience":
				return <div>{title}</div>;
			case "projectExperience":
				return <div>{title}</div>;
			case "worksShow":
				return <div>{title}</div>;
			case "descriptionAboutMe":
				return <div>{title}</div>;
			case "finalMotto":
				return <div>{title}</div>;
		}
	};

	return (
		<div className={style.container}>
			<div className={style.header}>
				<a
					className={style.author}
					href="https://github.com/HITPC"
					target="_blank"
				>
					PIAOCHEN
				</a>
				<a className={style.logo} href="/">
					{"PIPG"}
				</a>
			</div>
			<div className={style.titleContainer}>
				<span className={style.mainTitle}>{"< 配置展示信息 >"}</span>
			</div>
			<div className={style.configContainer}>
				<div className={style.topCheckboxContainer}>
					<span className={style.topCheckboxContainerTitle}>
						选择需要展示配置块：
					</span>
					<Checkbox.Group
						options={topTitleConfigs}
						defaultValue={checkedTopTitle}
						onChange={handleTopTitleConfigsChange}
					/>
				</div>
				{topTitleConfigs.map((item) => (
					<div
						className={style.dataContainer}
						style={
							checkedTopTitle.includes(item.value)
								? { width: "70%" }
								: { width: "0" }
						}
						key={item.value}
					>
						<div className={style.topTitle}>{item.label}</div>
						<div className={style.dataContentContainer}>
							{getTopTitleContent(item.value as UserDataKey)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Edit;
