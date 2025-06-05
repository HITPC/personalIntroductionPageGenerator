import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { Checkbox, Input, DatePicker, Popover, Select, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import type { CheckboxOptionType } from "antd";
import type { UserDataKey } from "@/types/userData";
import type { CheckboxChangeSituation } from "@/types/edit";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import type UserData from "@/types/userData";
import type TemplatesType from "@/types/template";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router";
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

	const UserDataLocal = localStorage.getItem("userData");
	let UserDataLocalParsed = null;
	if (UserDataLocal) {
		UserDataLocalParsed = JSON.parse(UserDataLocal);
	}

	const [checkedTopTitle, setCheckedTopTitle] = useState<string[]>(() => {
		if (UserDataLocalParsed) {
			return topTitleConfigs
				.filter(
					(item) => UserDataLocalParsed[item.value as UserDataKey] !== undefined
				)
				.map((item) => item.value);
		}
		return topTitleConfigs.map((item) => item.value);
	});

	const [messageApi, contextHolder] = message.useMessage();

	const [basicData, setBasicData] = useState<UserData["basicData"]>(() => {
		if (UserDataLocalParsed) {
			return UserDataLocalParsed.basicData;
		}
		return {
			name: "",
			birth: "",
			phone: "",
			email: "",
			wx: "",
		};
	});
	const [educationExperience, setEducationExperience] = useState<
		UserData["educationExperience"]
	>(() => {
		if (UserDataLocalParsed) {
			return UserDataLocalParsed.educationExperience;
		}
		return [
			{
				id: nanoid(),
				school: "",
				major: "",
				degree: "学士",
				schoolLevel: "985",
				startDate: "",
				endDate: "",
			},
		];
	});
	const [skillsAndCertifications, setSkillsAndCertifications] = useState<
		UserData["skillsAndCertifications"]
	>(() => {
		if (UserDataLocalParsed) {
			return UserDataLocalParsed.skillsAndCertifications;
		}
		return {
			skills: "",
			certifications: "",
		};
	});
	const [awards, setAwards] = useState<UserData["awards"]>(() => {
		if (UserDataLocalParsed && UserDataLocalParsed.awards) {
			return UserDataLocalParsed.awards;
		}
		return "";
	});
	const [internshipExperience, setInternshipExperience] = useState<
		UserData["internshipExperience"]
	>(() => {
		if (UserDataLocalParsed && UserDataLocalParsed.internshipExperience) {
			return UserDataLocalParsed.internshipExperience;
		}
		return [
			{
				id: nanoid(),
				company: "",
				position: "",
				startDate: "",
				endDate: "",
				description: "",
			},
		];
	});
	const [projectExperience, setProjectExperience] = useState<
		UserData["projectExperience"]
	>(() => {
		if (UserDataLocalParsed && UserDataLocalParsed.projectExperience) {
			return UserDataLocalParsed.projectExperience;
		}
		return [
			{
				id: nanoid(),
				name: "",
				position: "",
				description: "",
				startDate: "",
				endDate: "",
			},
		];
	});
	const [worksShow, setWorksShow] = useState<UserData["worksShow"]>(() => {
		if (UserDataLocalParsed && UserDataLocalParsed.worksShow) {
			return UserDataLocalParsed.worksShow;
		}
		return { title: "", description: "" };
	});
	const [descriptionAboutMe, setDescriptionAboutMe] = useState<
		UserData["descriptionAboutMe"]
	>(() => {
		if (UserDataLocalParsed && UserDataLocalParsed.descriptionAboutMe) {
			return UserDataLocalParsed.descriptionAboutMe;
		}
		return "";
	});
	const [finalMotto, setFinalMotto] = useState<UserData["finalMotto"]>(() => {
		if (UserDataLocalParsed && UserDataLocalParsed.finalMotto) {
			return UserDataLocalParsed.finalMotto;
		}
		return "";
	});
	const [template, setTemplate] = useState<TemplatesType>("DarkLight");

	// 为使用GSAP动画的准备
	const dataContainerRefs = useRef<Record<string, HTMLDivElement | null>>({});

	const checkboxChangeSituation = (
		newVal: string[]
	): CheckboxChangeSituation => {
		const res: CheckboxChangeSituation = {
			addOrDel: "unknow",
			target: "",
		};
		if (newVal.length > checkedTopTitle.length) {
			// 新增
			res.addOrDel = "add";
			res.target = newVal.find((item) => !checkedTopTitle.includes(item)) || "";
		} else {
			// 删除
			res.addOrDel = "del";
			res.target = checkedTopTitle.find((item) => !newVal.includes(item)) || "";
		}
		return res;
	};

	const handleTopTitleConfigsChange = (checkedValues: string[]) => {
		// 针对是哪一个值的变化来更新state 移除后变为空值
		setCheckedTopTitle(checkedValues);
		// GSAP动画处理
		const changeSituation = checkboxChangeSituation(checkedValues);
		// 顺带需要去掉对应收集到的表单值 后面需要补充
		if (changeSituation.addOrDel === "add") {
			const newDataContainer =
				dataContainerRefs.current[changeSituation.target];
			if (newDataContainer) {
				newDataContainer.style.display = "flex"; // 确保元素可见
				gsap.fromTo(
					// 使用fromTo保证进入时也有动画
					newDataContainer,
					{
						opacity: 0,
						scale: 0,
					},
					{
						opacity: 1,
						scale: 1,
						ease: "power2.out",
						duration: 0.6,
					}
				);
			}
		} else if (changeSituation.addOrDel === "del") {
			switch (changeSituation.target) {
				case "awards":
					setAwards("");
					break;
				case "internshipExperience":
					setInternshipExperience([
						{
							id: nanoid(),
							company: "",
							position: "",
							startDate: "",
							endDate: "",
							description: "",
						},
					]);
					break;
				case "projectExperience":
					setProjectExperience([
						{
							id: nanoid(),
							name: "",
							position: "",
							startDate: "",
							endDate: "",
							description: "",
						},
					]);
					break;
				case "worksShow":
					setWorksShow({
						title: "",
						description: "",
					});
					break;
				case "descriptionAboutMe":
					setDescriptionAboutMe("");
					break;
				case "finalMotto":
					setFinalMotto("");
					break;
			}
			const delDataContainer =
				dataContainerRefs.current[changeSituation.target];
			if (delDataContainer) {
				gsap.to(delDataContainer, {
					opacity: 0,
					scale: 0,
					ease: "power2.out",
					duration: 0.6,
					onComplete: () => {
						delDataContainer.style.display = "none"; // 动画完成后隐藏元素
					},
				});
			}
		}
	};

	useEffect(() => {
		topTitleConfigs.forEach((item) => {
			if (!checkedTopTitle.includes(item.value)) {
				const current = dataContainerRefs.current[item.value];
				if (current) {
					current.style.display = "none"; // 确保未选中的元素初始状态为隐藏
				}
			}
		});
	}, []);

	const onBirthDateChange = (_: any, dateString: string | string[]) => {
		if (!Array.isArray(dateString)) {
			setBasicData((prev) => {
				return {
					...prev,
					birth: dateString,
				};
			});
		}
	};

	const onBasicDataInputChange = (key: string, value: string) => {
		setBasicData((prev) => {
			return {
				...prev,
				[key]: value,
			};
		});
	};

	const addEducationExperience = () => {
		setEducationExperience((prev) => {
			return [
				...prev,
				{
					id: nanoid(),
					school: "",
					major: "",
					degree: "学士",
					schoolLevel: "985",
					startDate: "",
					endDate: "",
				},
			];
		});
	};

	const deleteEducationExperience = (index: number) => {
		setEducationExperience((prev) => {
			const newExperience = [...prev];
			newExperience.splice(index, 1);
			return newExperience;
		});
	};

	const onEduExpInputChange = (key: string, value: string, index: number) => {
		setEducationExperience((prev) => {
			const newExperience = [...prev];
			newExperience[index] = {
				...newExperience[index],
				[key]: value,
			};
			return newExperience;
		});
	};

	const onEduExpDateChange = (
		dateString: string | string[],
		startOrEnd: "startDate" | "endDate",
		index: number
	) => {
		setEducationExperience((prev) => {
			const newExperience = [...prev];
			newExperience[index] = {
				...newExperience[index],
				[startOrEnd]: dateString,
			};
			return newExperience;
		});
	};

	const onSkillsAndCertificationsChange = (
		key: "skills" | "certifications",
		value: string
	) => {
		setSkillsAndCertifications((prev) => {
			return {
				...prev,
				[key]: value,
			};
		});
	};

	const deleteInternshipExperience = (index: number) => {
		setInternshipExperience((prev) => {
			if (prev) {
				const newExperience = [...prev];
				newExperience.splice(index, 1);
				return newExperience;
			}
		});
	};

	const addInternshipExperience = () => {
		setInternshipExperience((prev) => {
			if (prev) {
				return [
					...prev,
					{
						id: nanoid(),
						company: "",
						position: "",
						startDate: "",
						endDate: "",
						description: "",
					},
				];
			}
		});
	};

	const onInternshipExpInputChange = (
		key: string,
		value: string,
		index: number
	) => {
		setInternshipExperience((prev) => {
			if (prev) {
				const newExperience = [...prev];
				newExperience[index] = {
					...newExperience[index],
					[key]: value,
				};
				return newExperience;
			}
		});
	};

	const onInternshipDateChange = (
		dateString: string | string[],
		startOrEnd: "startDate" | "endDate",
		index: number
	) => {
		setInternshipExperience((prev) => {
			if (prev) {
				const newExperience = [...prev];
				newExperience[index] = {
					...newExperience[index],
					[startOrEnd]: dateString,
				};
				return newExperience;
			}
		});
	};

	const deleteProjectExperience = (index: number) => {
		setProjectExperience((prev) => {
			if (prev) {
				const newExperience = [...prev];
				newExperience.splice(index, 1);
				return newExperience;
			}
		});
	};

	const addProjectExperience = () => {
		setProjectExperience((prev) => {
			if (prev) {
				return [
					...prev,
					{
						id: nanoid(),
						name: "",
						position: "",
						startDate: "",
						endDate: "",
						description: "",
					},
				];
			}
		});
	};

	const onProjectExpInputChange = (
		key: string,
		value: string,
		index: number
	) => {
		setProjectExperience((prev) => {
			if (prev) {
				const newExperience = [...prev];
				newExperience[index] = {
					...newExperience[index],
					[key]: value,
				};
				return newExperience;
			}
		});
	};

	const onProjectDateChange = (
		dateString: string | string[],
		startOrEnd: "startDate" | "endDate",
		index: number
	) => {
		setProjectExperience((prev) => {
			if (prev) {
				const newExperience = [...prev];
				newExperience[index] = {
					...newExperience[index],
					[startOrEnd]: dateString,
				};
				return newExperience;
			}
		});
	};

	const onWorksInputChange = (key: string, value: string) => {
		setWorksShow((prev) => {
			if (prev) {
				return {
					...prev,
					[key]: value,
				};
			}
		});
	};

	const getTopTitleContent = (title: UserDataKey) => {
		switch (title) {
			case "basicData":
				return (
					<>
						<div className={style.inputContainer}>
							<p className={style.inputLabel}>姓名</p>
							<Input
								allowClear
								onChange={(e) => onBasicDataInputChange("name", e.target.value)}
								value={basicData.name}
								placeholder="请输入姓名"
								className={style.input}
							></Input>
						</div>
						<div className={style.inputContainer}>
							<p className={style.inputLabel}>出生日期</p>
							<DatePicker
								className={style.input}
								placeholder="请选择出生日期"
								defaultValue={basicData.birth ? dayjs(basicData.birth) : null}
								onChange={onBirthDateChange}
							/>
						</div>
						<div className={style.inputContainer}>
							<p className={style.inputLabel}>电话号码</p>
							<Input
								allowClear
								onChange={(e) =>
									onBasicDataInputChange("phone", e.target.value)
								}
								value={basicData.phone}
								placeholder="请输入电话号码"
								className={style.input}
							></Input>
						</div>
						<div className={style.inputContainer}>
							<p className={style.inputLabel}>邮箱</p>
							<Input
								allowClear
								onChange={(e) =>
									onBasicDataInputChange("email", e.target.value)
								}
								value={basicData.email}
								placeholder="请输入邮箱"
								className={style.input}
							></Input>
						</div>
						<div className={style.inputContainer}>
							<p className={style.inputLabel}>微信</p>
							<Input
								allowClear
								onChange={(e) => onBasicDataInputChange("wx", e.target.value)}
								value={basicData.wx}
								placeholder="请输入微信号"
								className={style.input}
							></Input>
						</div>
					</>
				);
			case "educationExperience":
				return (
					<div className={style.eduContainer}>
						{educationExperience.map((item, index) => (
							<div className={style.eduMainContainer} key={item.id}>
								<div className={style.eduItemContainer}>
									<DeleteOutlined
										className={style.eduDeleteButton}
										onClick={() => deleteEducationExperience(index)}
									/>
									<div className={style.inputContainer}>
										<p className={style.inputLabel}>学校名称</p>
										<Input
											allowClear
											onChange={(e) =>
												onEduExpInputChange("school", e.target.value, index)
											}
											value={item.school}
											placeholder="请输入学校名称"
											className={style.input}
										></Input>
									</div>
									<div className={style.inputContainer}>
										<p className={style.inputLabel}>专业</p>
										<Input
											allowClear
											onChange={(e) =>
												onEduExpInputChange("major", e.target.value, index)
											}
											value={item.major}
											placeholder="请输入专业"
											className={style.input}
										></Input>
									</div>
									<div className={style.inputContainer}>
										<p className={style.inputLabel}>学位</p>
										<Select
											defaultValue="学士"
											onChange={(value) =>
												onEduExpInputChange("degree", value, index)
											}
											className={style.input}
											options={[
												{ value: "学士", label: "学士" },
												{ value: "硕士", label: "硕士" },
												{ value: "博士", label: "博士" },
												{ value: "其他", label: "其他 " },
											]}
										/>
									</div>
									<div className={style.inputContainer}>
										<p className={style.inputLabel}>学校层次</p>
										<Select
											defaultValue="985"
											onChange={(value) =>
												onEduExpInputChange("degree", value, index)
											}
											className={style.input}
											options={[
												{ value: "985", label: "985" },
												{ value: "211", label: "211" },
												{ value: "QS100", label: "QS100" },
												{ value: "双一流", label: "双一流" },
												{ value: "Other", label: "Other" },
											]}
										/>
									</div>
									<div className={style.inputContainer}>
										<p className={style.inputLabel}>开始日期</p>
										<DatePicker
											className={style.input}
											picker="month"
											placeholder="开始日期"
											defaultValue={
												item.startDate ? dayjs(item.startDate, "YYYY-MM") : null
											}
											onChange={(_, dateStr) =>
												onEduExpDateChange(dateStr, "startDate", index)
											}
										/>
									</div>
									<div className={style.inputContainer}>
										<p className={style.inputLabel}>结束日期</p>
										<DatePicker
											className={style.input}
											defaultValue={
												item.endDate ? dayjs(item.endDate, "YYYY-MM") : null
											}
											picker="month"
											placeholder="结束日期"
											onChange={(_, dateStr) =>
												onEduExpDateChange(dateStr, "endDate", index)
											}
										/>
									</div>
								</div>
								{index !== educationExperience.length - 1 && (
									<div className={style.eduDivider}></div>
								)}
							</div>
						))}
						<div
							className={style.eduAddButton}
							onClick={addEducationExperience}
						>
							<PlusOutlined />
						</div>
					</div>
				);
			case "skillsAndCertifications":
				return (
					<>
						<div className={style.inputContainer}>
							<p className={style.inputLabel}>掌握的技能</p>
							<Input
								onChange={(e) =>
									onSkillsAndCertificationsChange("skills", e.target.value)
								}
								value={skillsAndCertifications.skills}
								placeholder="请输入技能"
								className={style.input}
							/>
						</div>
						<div className={style.inputContainer}>
							<p className={style.inputLabel}>证书</p>
							<Input
								onChange={(e) =>
									onSkillsAndCertificationsChange(
										"certifications",
										e.target.value
									)
								}
								value={skillsAndCertifications.certifications}
								placeholder="请输入证书"
								className={style.input}
							/>
						</div>
					</>
				);
			case "awards":
				return (
					<div className={style.inputContainer}>
						<p className={style.inputLabel}>获奖情况</p>
						<Input
							onChange={(e) => setAwards(e.target.value)}
							value={awards}
							placeholder="请输入获奖情况"
							className={style.input}
						/>
					</div>
				);
			case "internshipExperience":
				return (
					<div className={style.eduContainer}>
						{internshipExperience?.map((item, index) => (
							<div className={style.eduMainContainer} key={item.id}>
								<div className={style.eduItemContainer}>
									<DeleteOutlined
										className={style.eduDeleteButton}
										onClick={() => deleteInternshipExperience(index)}
									/>
									<div className={style.inputContainer}>
										<p className={style.inputLabel}>单位名称</p>
										<Input
											allowClear
											onChange={(e) =>
												onInternshipExpInputChange(
													"company",
													e.target.value,
													index
												)
											}
											value={item.company}
											placeholder="请输入单位名称"
											className={style.input}
										></Input>
									</div>
									<div className={style.inputContainer}>
										<p className={style.inputLabel}>职位</p>
										<Input
											allowClear
											onChange={(e) =>
												onInternshipExpInputChange(
													"position",
													e.target.value,
													index
												)
											}
											value={item.position}
											placeholder="请输入职位名称"
											className={style.input}
										></Input>
									</div>
									<div className={style.inputContainer}>
										<p className={style.inputLabel}>开始日期</p>
										<DatePicker
											className={style.input}
											picker="month"
											placeholder="开始日期"
											defaultValue={
												item.startDate ? dayjs(item.startDate, "YYYY-MM") : null
											}
											onChange={(_, dateStr) =>
												onInternshipDateChange(dateStr, "startDate", index)
											}
										/>
									</div>
									<div className={style.inputContainer}>
										<p className={style.inputLabel}>结束日期</p>
										<DatePicker
											className={style.input}
											picker="month"
											placeholder="结束日期"
											defaultValue={
												item.endDate ? dayjs(item.endDate, "YYYY-MM") : null
											}
											onChange={(_, dateStr) =>
												onInternshipDateChange(dateStr, "endDate", index)
											}
										/>
									</div>
									<div className={style.inputContainer}>
										<p className={style.inputLabel}>工作内容</p>
										<Input
											allowClear
											onChange={(e) =>
												onInternshipExpInputChange(
													"description",
													e.target.value,
													index
												)
											}
											value={item.description}
											placeholder="请输入工作内容"
											className={style.input}
										></Input>
									</div>
								</div>
								{index !== internshipExperience.length - 1 && (
									<div className={style.eduDivider}></div>
								)}
							</div>
						))}
						<div
							className={style.eduAddButton}
							onClick={addInternshipExperience}
						>
							<PlusOutlined />
						</div>
					</div>
				);
			case "projectExperience":
				return (
					<div className={style.eduContainer}>
						{projectExperience?.map((item, index) => (
							<div className={style.eduMainContainer} key={item.id}>
								<div className={style.eduItemContainer}>
									<DeleteOutlined
										className={style.eduDeleteButton}
										onClick={() => deleteProjectExperience(index)}
									/>
									<div className={style.inputContainer}>
										<p className={style.inputLabel}>项目名称</p>
										<Input
											allowClear
											onChange={(e) =>
												onProjectExpInputChange("name", e.target.value, index)
											}
											value={item.name}
											placeholder="请输入项目名称"
											className={style.input}
										></Input>
									</div>
									<div className={style.inputContainer}>
										<p className={style.inputLabel}>职位</p>
										<Input
											allowClear
											onChange={(e) =>
												onProjectExpInputChange(
													"position",
													e.target.value,
													index
												)
											}
											value={item.position}
											placeholder="请输入职位名称"
											className={style.input}
										></Input>
									</div>
									<div className={style.inputContainer}>
										<p className={style.inputLabel}>开始日期</p>
										<DatePicker
											className={style.input}
											picker="month"
											placeholder="开始日期"
											defaultValue={
												item.startDate ? dayjs(item.startDate, "YYYY-MM") : null
											}
											onChange={(_, dateStr) =>
												onProjectDateChange(dateStr, "startDate", index)
											}
										/>
									</div>
									<div className={style.inputContainer}>
										<p className={style.inputLabel}>结束日期</p>
										<DatePicker
											className={style.input}
											picker="month"
											placeholder="结束日期"
											defaultValue={
												item.endDate ? dayjs(item.endDate, "YYYY-MM") : null
											}
											onChange={(_, dateStr) =>
												onProjectDateChange(dateStr, "endDate", index)
											}
										/>
									</div>
									<div className={style.inputContainer}>
										<p className={style.inputLabel}>项目描述</p>
										<Input
											allowClear
											onChange={(e) =>
												onProjectExpInputChange(
													"description",
													e.target.value,
													index
												)
											}
											value={item.description}
											placeholder="请输入项目描述"
											className={style.input}
										></Input>
									</div>
								</div>
								{index !== projectExperience.length - 1 && (
									<div className={style.eduDivider}></div>
								)}
							</div>
						))}
						<div className={style.eduAddButton} onClick={addProjectExperience}>
							<PlusOutlined />
						</div>
					</div>
				);
			case "worksShow":
				return (
					<>
						<div className={style.inputContainer}>
							<p className={style.inputLabel}>作品名</p>
							<Input
								allowClear
								onChange={(e) => onWorksInputChange("title", e.target.value)}
								value={worksShow?.title}
								placeholder="请输入作品名称"
								className={style.input}
							></Input>
						</div>
						<div className={style.inputContainer}>
							<p className={style.inputLabel}>描述</p>
							<Input
								allowClear
								onChange={(e) =>
									onWorksInputChange("description", e.target.value)
								}
								value={worksShow?.description}
								placeholder="请输入作品描述，最好是贴链接"
								className={style.input}
							></Input>
						</div>
					</>
				);
			case "descriptionAboutMe":
				return (
					<div className={style.inputContainer}>
						<p className={style.inputLabel}>自我评价</p>
						<Input
							allowClear
							onChange={(e) => setDescriptionAboutMe(e.target.value)}
							value={descriptionAboutMe}
							placeholder="请输入自我评价"
							className={style.input}
						></Input>
					</div>
				);
			case "finalMotto":
				return (
					<div className={style.inputContainer}>
						<p className={style.inputLabel}>格言</p>
						<Input
							allowClear
							onChange={(e) => setFinalMotto(e.target.value)}
							value={finalMotto}
							placeholder="请输入格言"
							className={style.input}
						></Input>
					</div>
				);
		}
	};

	const save = () => {
		const userData: UserData = {
			basicData,
			educationExperience,
			skillsAndCertifications,
		};
		if (checkedTopTitle.includes("awards")) {
			userData.awards = awards;
		}
		if (checkedTopTitle.includes("internshipExperience")) {
			userData.internshipExperience = internshipExperience;
		}
		if (checkedTopTitle.includes("projectExperience")) {
			userData.projectExperience = projectExperience;
		}
		if (checkedTopTitle.includes("worksShow")) {
			userData.worksShow = worksShow;
		}
		if (checkedTopTitle.includes("descriptionAboutMe")) {
			userData.descriptionAboutMe = descriptionAboutMe;
		}
		if (checkedTopTitle.includes("finalMotto")) {
			userData.finalMotto = finalMotto;
		}
		localStorage.setItem("userData", JSON.stringify(userData));
		messageApi.success("本地保存成功!");
	};

	const navigate = useNavigate();
	const toPreview = () => {
		save();
		navigate(`/preview?template=${template}`);
	};

	return (
		<>
			{contextHolder}
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
					<Popover content="下方字段均未配置校验，为保证效果，请您填写正确的内容。填写的信息为本地存储，不会上传。">
						<QuestionCircleOutlined className={style.titleExplain} />
					</Popover>
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
							key={item.value}
							ref={(el) => {
								if (el) {
									dataContainerRefs.current[item.value] = el;
								}
							}}
						>
							<div className={style.topTitle}>{item.label}</div>
							<div className={style.dataContentContainer}>
								{getTopTitleContent(item.value as UserDataKey)}
							</div>
						</div>
					))}
				</div>
				<div className={style.dataContainer}>
					<div className={style.topTitle}>模板选择</div>
					<div className={style.dataContentContainer}>
						<div className={style.inputContainer}>
							<p className={style.inputLabel}>模板</p>
							<Select
								defaultValue="DarkLight"
								onChange={(value) => setTemplate(value as TemplatesType)}
								className={style.input}
								options={[
									{ value: "DarkLight", label: "黑白光影" },
									{ value: "RedWhite", label: "红白古典" },
									{ value: "BlueWhite", label: "蓝白活力" },
								]}
							/>
						</div>
					</div>
				</div>
				<div className={style.buttonContainer}>
					<button className={style.saveButton} onClick={save}>
						保存
					</button>
					<button className={style.button} onClick={toPreview}>
						预览结果
					</button>
				</div>
			</div>
		</>
	);
};

export default Edit;
