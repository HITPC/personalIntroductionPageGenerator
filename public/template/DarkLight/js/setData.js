// 数据设置相关逻辑，在下载下来的内容中不会存在
window.onload = () => {
	console.log('@data-setter: 开始设置数据');
	const dataStr = localStorage.getItem("userData");
	if (!dataStr) {
		alert(
			"检测到您好像未设置自己的信息，下面的显示情况可能不正确，请检查是否是正确填写了自己的个人信息才进入本页面的"
		);
	}
	const userData = dataStr
		? JSON.parse(dataStr)
		: {
				basicData: {
					name: "",
					birth: "",
					phone: "",
					email: "",
					wx: "",
				},
				educationExperience: [
					{
						id: "",
						school: "",
						major: "",
						degree: "学士",
						schoolLevel: "985",
						startDate: "",
						endDate: "",
					},
				],
				skillsAndCertifications: {
					skills: [],
					certifications: [],
				},
				awards: [],
				internshipExperience: [
					{
						id: "",
						company: "",
						position: "",
						startDate: "",
						endDate: "",
						description: "",
					},
				],
				projectExperience: [
					{
						id: "",
						name: "",
						position: "",
						description: "",
						startDate: "",
						endDate: "",
					},
				],
				worksShow: {
					title: "",
					description: "",
				},
				descriptionAboutMe: "",
				finalMotto: "",
		  };
  
};
