import jsPDF from 'jspdf';
import emailIcon from './assets/email.png';
import linkedinIcon from './assets/linkedin.png';
import githubIcon from './assets/github.png';
import phoneIcon from './assets/phone.png';

const loadImageAsBase64 = async (url) => {
  const res = await fetch(url);
  const blob = await res.blob();

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};


const generatePDF = async (info) => {
  const doc = new jsPDF();

    // Load Base64 images
  const emailBase64 = await loadImageAsBase64(emailIcon);
  const linkedinBase64 = await loadImageAsBase64(linkedinIcon);
  const githubBase64 = await loadImageAsBase64(githubIcon);
  const phoneBase64 = await loadImageAsBase64(phoneIcon);

  // Set styles
  doc.setFont('Times New Roman','bold');
  doc.setFontSize(18);
  doc.text(info.Name, 20, 20);

  doc.setFont(undefined, 'normal');
  doc.setFontSize(12);
const iconSize = 4;

doc.addImage(emailBase64, 'PNG', 140, 35, iconSize, iconSize);
  doc.text(` ${info.Email}`, 144, 38);
doc.addImage(phoneBase64, 'PNG', 140, 27, iconSize, iconSize);
  doc.text(` ${info.Contact}`, 144, 30);
doc.addImage(linkedinBase64, 'PNG', 20, 27, iconSize, iconSize);
  doc.text(` ${info.LinkedIn}`, 24, 30);
doc.addImage(githubBase64, 'PNG', 20, 35, iconSize, iconSize);
  doc.text(` ${info.GitHub}`, 24, 38);
  doc.text

  // Education
  doc.setFontSize(18);
  doc.text('Education', 20, 50);
  // Draw underline below the text
doc.setLineWidth(0.3); // thin line
doc.line(20, 52, 190, 52); // from x1,y1 to x2,y2
 let y= 59;
  info.Education.forEach((edu, i) => {
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(`• ${edu.degree}`, 20, y);
    doc.setFontSize(12);
    doc.setFont("Times New Roman","italic");
    doc.text(`${edu.from}-${edu.to}`, 165, y);
    doc.setFontSize(12);
    doc.text(`  ${edu.college}`,20,y+6);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(12);
    doc.text(`${edu.displayGradeAs}: ${edu.grade}`, 165, y + 6);
    y += 15;
  });

  // Projects
  doc.setFontSize(18);
  y+=5;
  doc.text('Personal Projects', 20, y);
  // Draw underline below the text
doc.setLineWidth(0.3); // thin line
doc.line(20,y+2 , 190, y+2); // from x1,y1 to x2,y2
  y += 8;
  info.Projects.forEach((proj) => {
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(`• ${proj.title}`, 20, y);
    y += 6;
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    let lineHeight = 6;
        const wrappedLines = doc.splitTextToSize(proj.desc, 170); // max width = 170mm
        doc.text(wrappedLines, 20, y);  // write the wrapped lines
        y += wrappedLines.length * lineHeight;  // move y for the next section
    proj.feat.forEach((feat) => {
        doc.text(`- `, 24, y);
        const wrappedLines = doc.splitTextToSize(feat, 164); // max width = 170mm
        doc.text(wrappedLines, 26, y);  // write the wrapped lines
        y += wrappedLines.length * lineHeight;  // move y for the next section
    });
    y += 4;
  });

  // Technical Skills
  doc.setFontSize(18);
  //y+=5;
  doc.text('Technical Skills', 20, y);
  // Draw underline below the text
doc.setLineWidth(0.3); // thin line
doc.line(20,y+2 , 190, y+2); // from x1,y1 to x2,y2
  y += 8;
  info.TechnicalSkills.forEach((skill) => {
    doc.setFontSize(13);
    doc.setFont(undefined,"bold");
    doc.text(`${skill.heading}: `, 20, y);
    const headingWidth = doc.getTextWidth(`${skill.heading}: `);
    doc.setFont(undefined,"normal");
    doc.setFontSize(12);
        let lineHeight = 6;
        const wrappedLines = doc.splitTextToSize(skill.desc, 170 - (headingWidth+1)); // max width = 170mm
        doc.text(wrappedLines, 20+headingWidth+1, y);  // write the wrapped lines
        y += wrappedLines.length * lineHeight;  // move y for the next section
  });
  y+= 4;
  // Achievements
  doc.setFontSize(18);
  doc.text('Achievements', 20, y);
  // Draw underline below the text
  doc.setLineWidth(0.3); // thin line
  doc.line(20,y+2 , 190, y+2); // from x1
  y += 8;
  info.Achievements.forEach((ach) => {
    doc.setFontSize(12);
    doc.setFont(undefined,"bold");
    doc.text(`- ${ach.title}`, 20, y);
    doc.setFont(undefined,"normal");
    y+=6;
    let lineHeight = 6;
        const wrappedLines = doc.splitTextToSize(ach.desc, 170); // max width = 170mm
        doc.text(wrappedLines, 20, y);  // write the wrapped lines
        y += wrappedLines.length * lineHeight;  // move y for the next section
  });

  // Save PDF
  doc.save('resume.pdf');
};

export {generatePDF}