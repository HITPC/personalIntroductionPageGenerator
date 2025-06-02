import React from "react";
import PIGGInput from "@/components/PIGGInput";
import { useUserDataStore } from "@/store/userDataStore";
import style from "./index.module.css";

const Edit: React.FC = () => {
	const {
		basicData,
		educationExperience,
		skillsAndCertifications,
		internshipExperience,
		projectExperience,
		worksShow,
		descriptionAboutMe,
	} = useUserDataStore();
	console.log(
		"read store data: ",
		basicData,
		educationExperience,
		skillsAndCertifications,
		internshipExperience,
		projectExperience,
		worksShow,
		descriptionAboutMe
	);

	return (
		<div>
			<PIGGInput />
		</div>
	);
};

export default Edit;
