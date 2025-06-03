export default interface UserData {
  basicData: {
    name: string;
    birth: string;
    phone: string;
    email: string;
    wx: string;
    avatar?: File | string;
  };

  educationExperience: {
    school: string;
    major: string;
    degree: "学士" | "硕士" | "博士";
    schoolLevel?: "985" | "211" | "QS100" | "双一流" | "Other";
    startDate: string;
    endDate: string;
    schoolIcon?: File | string;
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
    companyIcon?: File | string;
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
    image?: File | string;
  };

  descriptionAboutMe?: string;
  finalMotto?: string;
}

export interface UserDataZustand extends UserData {
  setData: (data: Partial<UserData>) => void;
  resetData: () => void;
}

export type UserDataKey = keyof UserData;
