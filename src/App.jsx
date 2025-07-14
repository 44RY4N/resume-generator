import React, { useState } from 'react';
import {Preview} from "./preview.jsx";
import {generatePDF} from "./generatePDF.js"




// Define initial state outside the component
const initialInfo = {
  Name: "",
  Contact: "",
  Email: "",
  LinkedIn: "",
  "LinkedIn Link:": "",
  GitHub: "",
  "GitHub Link:" : "",
  Education: [],
  Projects: [],
  TechnicalSkills: [],
  Achievements: [],
};

function App() {
  const [info, setInfo] = useState(initialInfo);

  const handleDownloadPDF = () => {
  generatePDF(info);
};

  const personal = [
    ["Name", "text"],
    ["Contact", "number"],
    ["Email", "email"],
    ["LinkedIn", "text"],
    ["LinkedIn Link:","url"],
    ["GitHub", "text"],
    ["GitHub Link:","url"],
  ];

  const addEducation = () => {
    console.log("Clicked add education");
    setInfo((prevInfo) => {
      const newInfo = {
        ...prevInfo,
        Education: [
          ...prevInfo.Education,
          {
            index: prevInfo.Education.length,
            college: "",
            degree: "",
            from: "",
            to: "",
            grade: "",
            displayGradeAs: "Grade",  //
          },
        ],
      };
      console.log("Updated info:", newInfo);
      return newInfo;
    });
  };

  const addSkills = () => {
    console.log("Clicked add Skills");
    setInfo((prevInfo) => {
      const newInfo = {
        ...prevInfo,
        TechnicalSkills: [
          ...prevInfo.TechnicalSkills,
          {
            index: prevInfo.TechnicalSkills.length,
            heading: "",
            desc: "",
          },
        ],
      };
      console.log("Updated info:", newInfo);
      return newInfo;
    });
  };

  const addProjects = () => {
    console.log("Clicked add Project");
    setInfo((prevInfo) => {
      const newInfo = {
        ...prevInfo,
        Projects: [
          ...prevInfo.Projects,
          {
            index: prevInfo.Projects.length,
            title: "",
            desc: "",
            link: "",
            feat: [],
          },
        ],
      };
      console.log("Updated info:", newInfo);
      return newInfo;
    });
  };

    const addAchievements = () => {
    console.log("Clicked add achievement");
    setInfo((prevInfo) => {
      const newInfo = {
        ...prevInfo,
        Achievements: [
          ...prevInfo.Achievements,
          {
            index: prevInfo.Achievements.length,
            title: "",
            desc: ""
          },
        ],
      };
      console.log("Updated info:", newInfo);
      return newInfo;
    });
  };

  return (
  <>
    <div className='container'>
      <h1>Resume Generator</h1>
      <h3>Personal Information</h3>
      <Info arr={personal} info={info} setInfo={setInfo} />
      <h3>Educational Experience</h3>
      <Button tag="Add Education" handleClick={addEducation} />
      {info.Education.map((edu, index) => (
        <EducationInput
          key={edu.index}
          index={index}
          education={edu}
          setInfo={setInfo}
        />
      ))}
      <h3>Technical Skills</h3>
      <Button tag="Add Technical Skill" handleClick={addSkills} />
      {info.TechnicalSkills.map((skills, index) => (
        <SkillsInput
          key={skills.index}
          index={index}
          skills={skills}
          setInfo={setInfo}
        />
      ))}
      <h3>Projects</h3>
      <Button tag="Add Project" handleClick={addProjects} />
      {info.Projects.map((project, index) => (
        <ProjectsInput
          key={project.index}
          index={index}
          project={project}
          setInfo={setInfo}
        />
      ))}
      <h3>Achievements</h3>
      <Button tag="Add Achievement" handleClick={addAchievements} />
       {info.Achievements.map((achievement, index) => (
        <AchievementsInput
          key={achievement.index}
          index={index}
          achievement={achievement}
          setInfo={setInfo}
        />
      ))}
      <h3>Current State</h3>
        <button onClick={handleDownloadPDF} className = "download" style={{ marginLeft: '20px' }}>Download Resume</button>
    </div>
    <div className='preview'><Preview obj = {info} setInfo = {setInfo}/></div>
    <div className='footer'></div>
    </>
  );
}

function Button({ tag, handleClick}) {
  return <button onClick={handleClick} style={{ marginLeft: '20px' }}>{tag}</button>;
}

function Info({ arr, info, setInfo }) {
  const handleChange = (e, key) => {
    setInfo({ ...info, [key]: e.target.value });
  };

  return (
    <div className="personal-form" style={{ margin: '10px 0' }}>
      {arr.map(([label, type], index) => (
        <Input
          key={index}
          label={label}
          type={type}
          value={info[label]}
          onChange={(e) => handleChange(e, label)}
        />
      ))}
    </div>
  );
}

function Input({ label, type = "text", value, onChange }) {
  return (
    <div className="quest" style={{ margin: '5px 0' }}>
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} style={{ marginLeft: '10px' }} />
    </div>
  );
}

function EducationInput({ index, education, setInfo }) {
  const handleChange = (e, field) => {
    setInfo((prevInfo) => {
      const updatedEducation = [...prevInfo.Education];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [field]: e.target.value,
      };
      return {
        ...prevInfo,
        Education: updatedEducation,
      };
    });
  };

  const removeEducation = () => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      Education: prevInfo.Education.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="education-form" style={{ margin: '10px 0', border: '1px solid #ccc', padding: '10px' }}>
      <h4>Education Entry No: {index + 1}</h4>
      <Input
        label="College"
        value={education.college}
        onChange={(e) => handleChange(e, 'college')}
      />
      <Input
        label="Degree"
        value={education.degree}
        onChange={(e) => handleChange(e, 'degree')}
      />
      <Input
        label="From"
        type="number"
        value={education.from}
        onChange={(e) => handleChange(e, 'from')}
      />
      <Input
        label="To"
        type="number"
        value={education.to}
        onChange={(e) => handleChange(e, 'to')}
      />
      <Input
        label="Grade"
        value={education.grade}
        onChange={(e) => handleChange(e, 'grade')}
      />
      <Button tag="Remove Education" handleClick={removeEducation} />
    </div>
  );
}

function SkillsInput({ index, skills, setInfo }) {
  const handleChange = (e, field) => {
    setInfo((prevInfo) => {
      const updatedSkills = [...prevInfo.TechnicalSkills];
      updatedSkills[index] = {
        ...updatedSkills[index],
        [field]: e.target.value,
      };
      return {
        ...prevInfo,
        TechnicalSkills: updatedSkills,
      };
    });
  };

  const removeSkill = () => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      TechnicalSkills: prevInfo.TechnicalSkills.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="skills-form" style={{ margin: '伊朗', border: '1px solid #ccc', padding: '10px' }}>
      <h4>Skills Entry No: {index + 1}</h4>
      <Input
        label="Heading"
        value={skills.heading}
        onChange={(e) => handleChange(e, 'heading')}
      />
      <Input
        label="Description"
        value={skills.desc}
        onChange={(e) => handleChange(e, 'desc')}
      />
      <Button tag="Remove Skill" handleClick={removeSkill} />
    </div>
  );
}

function ProjectsInput({ index, project, setInfo }) {
  const handleChange = (e, field) => {
    setInfo((prevInfo) => {
      const updatedProjects = [...prevInfo.Projects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: e.target.value,
      };
      return {
        ...prevInfo,
        Projects: updatedProjects,
      };
    });
  };

  const addFeature = () => {
    setInfo((prevInfo) => {
      const updatedProjects = [...prevInfo.Projects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        feat: [...updatedProjects[index].feat, ""],
      };
      return {
        ...prevInfo,
        Projects: updatedProjects,
      };
    });
  };

  const updateFeature = (e, featureIndex) => {
    setInfo((prevInfo) => {
      const updatedProjects = [...prevInfo.Projects];
      const updatedFeatures = [...updatedProjects[index].feat];
      updatedFeatures[featureIndex] = e.target.value;
      updatedProjects[index] = {
        ...updatedProjects[index],
        feat: updatedFeatures,
      };
      return {
        ...prevInfo,
        Projects: updatedProjects,
      };
    });
  };

  const removeFeature = (featureIndex) => {
    setInfo((prevInfo) => {
      const updatedProjects = [...prevInfo.Projects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        feat: updatedProjects[index].feat.filter((_, i) => i !== featureIndex),
      };
      return {
        ...prevInfo,
        Projects: updatedProjects,
      };
    });
  };

  const removeProject = () => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      Projects: prevInfo.Projects.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="projects-form" style={{ margin: '10px 0', border: '1px solid #ccc', padding: '10px' }}>
      <h4>Project Entry No: {index + 1}</h4>
      <Input
        label="Project Title"
        value={project.title}
        onChange={(e) => handleChange(e, 'title')}
      />
      <Input
        label="Description"
        value={project.desc}
        onChange={(e) => handleChange(e, 'desc')}
      />
      <Input
        label="Link"
        value={(project.link) && project.link}
        onChange={(e) => handleChange(e, 'link')}
      />
      <h5>Features</h5>
      <Button tag="Add Feature" handleClick={addFeature} />
      {project.feat.map((feature, featureIndex) => (
        <div key={featureIndex} style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
          <Input
            label={`Feature ${featureIndex + 1}`}
            value={feature}
            onChange={(e) => updateFeature(e, featureIndex)}
          />
          <Button tag="Remove Feature" handleClick={() => removeFeature(featureIndex)} />
        </div>
      ))}
      <Button tag="Remove Project" handleClick={removeProject} />
    </div>
  );
}

function AchievementsInput({ index, achievement, setInfo }) {
  const handleChange = (e, field) => {
    setInfo((prevInfo) => {
      const updatedAchievements = [...prevInfo.Achievements];
      updatedAchievements[index] = {
        ...updatedAchievements[index],
        [field]: e.target.value,
      };
      return {
        ...prevInfo,
        Achievements: updatedAchievements,
      };
    });
  };

  const removeAchievements = () => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      Achievements: prevInfo.Achievements.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="achievements-form" style={{ margin: '伊朗', border: '1px solid #ccc', padding: '10px' }}>
      <h4>Achievements Entry No: {index + 1}</h4>
      <Input
        label="Title"
        value={achievement.title}
        onChange={(e) => handleChange(e, 'title')}
      />
      <Input
        label="Description"
        value={achievement.desc}
        onChange={(e) => handleChange(e, 'desc')}
      />
      <Button tag="Remove Achievement" handleClick={removeAchievements} />
    </div>
  );
}

export { App };