export default interface UserData {
  basicData: {
    name: string;
    birth: string;
    phone: string;
    email: string;
    wx: string;
  };

  educationExperience: {
    school: string;
    major: string;
    degree: "学士" | "硕士" | "博士";
    schoolLevel: "985" | "211" | "QS100" | "双一流" | "Other";
    startDate: string;
    endDate: string;
  }[];

  skillsAndCertifications: {
    skills: string[];
    certifications: string[];
  };

  awards?: string[];

  internshipExperience?: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];

  projectExperience?: {
    name: string;
    position: string;
    description: string;
    startDate: string;
    endDate: string;
  }[];

  worksShow?: {
    title: string;
    description: string;
  };

  descriptionAboutMe?: string;
  finalMotto?: string;
}

export type UserDataKey = keyof UserData;
