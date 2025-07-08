import React, { useState } from 'react';

// Define initial state outside the component
const initialInfo = {
  Name: "",
  Contact: "",
  Email: "",
  LinkedIn: "",
  GitHub: "",
  Education: [],
  Projects: [],
  TechnicalSkills: [],
  Achievements: [],
};

function App() {
  const [info, setInfo] = useState(initialInfo);

  const personal = [
    ["Name", "text"],
    ["Contact", "number"],
    ["Email", "email"],
    ["LinkedIn", "url"],
    ["GitHub", "url"],
  ];

  const addEducation = () => {
    console.log("Clicked add education");
    setInfo((prevInfo) => ({
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
        },
      ],
    }));
  };

    const addSkills = () => {
    console.log("Clicked add Skills");
    setInfo((prevInfo) => ({
      ...prevInfo,
      TechnicalSkills: [
        ...prevInfo.TechnicalSkills,
        {
          index: prevInfo.TechnicalSkills.length, 
          heading: "",
          desc: ""
        },
      ],
    }));
    console.log("info",info);
  };

    const addProjects = () => {
    console.log("Clicked add Projects");
    setInfo((prevInfo) => ({
      ...prevInfo,
      Projects: [
        ...prevInfo.Projects,
        {
          index: prevInfo.Projects.length, 
          title: "",
          desc: "",
          feat:""
        },
      ],
    }));
    console.log("info",info);
  };

  return (
    <>
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
      <Button tag="Add Technical Skills" handleClick={addSkills}/>
            {info.TechnicalSkills.map((skills, index) => (
        <SkillsInput
          key={skills.index}
          index={index}
          skills={skills}
          setInfo={setInfo}
        />
      ))}
        <Button tag="Add Projects" handleClick={addProjects}/>
            {info.Projects.map((projects, index) => (
        <ProjectsInput
          key={projects.index}
          index={index}
          projects={projects}
          setInfo={setInfo}
        />
      ))}
    </>
  );
}

function Button({ tag, handleClick }) {
  return <button onClick={handleClick}>{tag}</button>;
}

function Info({ arr, info, setInfo }) {
  const handleChange = (e, key) => {
    setInfo({ ...info, [key]: e.target.value });
  };

  return (
    <div className="personal-form">
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
    <div className="quest">
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} />
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

  return (
    <div className="education-form">
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
        type="number" // Could use "date" if you want a date picker
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

  return (
    <div className="skills-form">
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
    </div>
  );
}


function ProjectsInput({ index, projects, setInfo }) {
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

  return (
    <div className="projects-form">
      <h4>Project Entry No: {index + 1}</h4>
      <Input
        label="Project Title"
        value={projects.title}
        onChange={(e) => handleChange(e, 'title')}
      />
      <Input
        label="Description"
        value={projects.desc}
        onChange={(e) => handleChange(e, 'desc')}
      />
      <Input
        label="Features"
        value={projects.feat}
        onChange={(e) => handleChange(e, 'feat')}
      />
    </div>
  );
}




export { App };