import React from 'react';
import emailB from "./assets/email.png"
import linked from "./assets/linkedin.png"
import github from "./assets/github.png"
import phone from "./assets/phone.png"
import {useState} from "react";

function Preview({obj, setInfo}){

    
  let educationList = obj.Education;
  let projectList = obj.Projects;
  let skillList = obj.TechnicalSkills;
  let achievementList = obj.Achievements;
     return <>
    <div className='head'>
    <div className="bold name">{obj.Name}</div>
    <div className='email'><img src={emailB} />{obj.Email}</div>
    <div className='linkedin'><img src={linked}></img><a href={obj.LinkedIn} target="_blank" rel="noopener noreferrer">{obj.LinkedIn}</a></div>

   <div className='github'><img src={github}></img><a href={obj.GitHub} target="_blank" rel="noopener noreferrer">{obj.GitHub}</a></div>

    <div className='phone'><img src={phone}></img>{obj.Contact}</div>
    </div>
    <div className='neck'>
        <div className="name edu">Education</div>
        {educationList.map((edu, index) => (
        <Education edu={edu} index={index} setInfo = {setInfo} />
        ))}
        <div className="name edu">Personal Projects</div>
        {projectList.map((pro, index) => (
        <Project pro={pro} index={index} />
        ))}
        <div className="name edu">Technical Skills and Interests</div>
        {skillList.map((skill, index) => (
        <Skill skill={skill} index={index} />
        ))}
        <div className="name edu">Achievements</div>
        {achievementList.map((achieve, index) => (
        <Achieve achieve={achieve} index={index} />
        ))}
    </div>
    </>
}

function Education ({edu, index, setInfo}){
 const handleClick = () => {
    let next;
    if (edu.displayGradeAs === "Grade") next = "CGPA";
    else if (edu.displayGradeAs === "CGPA") next = "CPI";
    else if (edu.displayGradeAs === "CPI") next = "Percentage";
    else next = "Grade";

    // Update info state
    setInfo((prevInfo) => {
      const updated = [...prevInfo.Education];
      updated[index] = {
        ...updated[index],
        displayGradeAs: next,
      };
      return {
        ...prevInfo,
        Education: updated,
      };
    });
  };

    return <>
            <div className='education'>
            <div className="degree" key={index}>• {edu.degree}</div>
            <div className="college" key={index}>{edu.college}</div>
            <div className='from' key={index}>{edu.from} -</div>
            <div className='to' key={index}>{edu.to}</div>
            <div className='grade' key={index}>
                <div className='current' onClick={handleClick}>{edu.displayGradeAs}</div>
                : {edu.grade}</div>
            </div>
            </>
}


function Project({pro,index}){
    let featuresList = pro.feat;
    return <>
    <div className='project'>
        <div className="protitle" key={index}>• {pro.title}</div>
        <div className='prodesc' key={index}>{pro.desc}</div>
        <ul className='features'>
        {featuresList.map((feat,index) =>{
            return <div className='feat' key={index}>- {feat} </div>
            
        })}
        </ul>
    </div>
    </>
}

function Skill({skill,index}){
    return <>
    <div className='skill'>
        <div className="heading" key={index}>{skill.heading}</div>
        <div className='skilldesc' key={index}>: {skill.desc}</div>
    </div>
    </>
}

function Achieve({achieve,index}){
    return <>
    <div className='achieve'>
        <div className="achievetitle" key={index}>- {achieve.title}</div>
        <div className='achievedesc' key={index}> {achieve.desc}</div>
    </div>
    </>
}
         
export{Preview}