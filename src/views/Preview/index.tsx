import React from 'react';

const Preview: React.FC = () => {
  const dataStr  = localStorage.getItem("userData");
  const UserData = dataStr ? JSON.parse(dataStr) : {
    basicData: {
      name: "",
      birth: "",
      phone: "",
      email: "",
      wx: ""
    },
    educationExperience: [],
    skillsAndCertifications: {
      skills: [],
      certifications: []
    },
    awards: [],
    internshipExperience: [],
    projectExperience: [],
    worksShow: {
      title: "",
      description: ""
    },
    descriptionAboutMe: "",
    finalMotto: ""
  };
  console.log(UserData);
  
  return (
    <div>prew</div>
  )
}

export default Preview;