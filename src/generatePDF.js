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
  const pageHeight = doc.internal.pageSize.height;
  const marginTop = 20;
  const pageMarginBottom = 20; // Margin at the bottom of the page
  let y = marginTop;

  // Function to check if we need a new page
  const checkAndAddPage = () => {
    if (y > pageHeight - pageMarginBottom) {
      doc.addPage();
      y = marginTop; // Reset y to top of new page
    }
  };

  // Load Base64 images
  const emailBase64 = await loadImageAsBase64(emailIcon);
  const linkedinBase64 = await loadImageAsBase64(linkedinIcon);
  const githubBase64 = await loadImageAsBase64(githubIcon);
  const phoneBase64 = await loadImageAsBase64(phoneIcon);

  // Set styles
  doc.setFont('Times New Roman', 'bold');
  doc.setFontSize(18);
  doc.text(info.Name, 20, y);
  y += 10;

  doc.setFont(undefined, 'normal');
  doc.setFontSize(12);
  const iconSize = 4;
if(info.Contact){
  doc.addImage(phoneBase64, 'PNG', 140, y, iconSize, iconSize);
  doc.text(` ${info.Contact}`, 144, y + 3);
  checkAndAddPage();
}

if (info.LinkedIn) {
  doc.addImage(linkedinBase64, 'PNG', 20, y, iconSize, iconSize);
  doc.textWithLink(` ${info.LinkedIn}`, 24, y + 3,{url:info["LinkedIn Link:"]});
  y += 8;
  checkAndAddPage();
}

if (info.Email) {
  doc.addImage(emailBase64, 'PNG', 140, y, iconSize, iconSize);
  doc.text(` ${info.Email}`, 144, y + 3);
  checkAndAddPage();
}

if(info.GitHub){
  doc.addImage(githubBase64, 'PNG', 20, y, iconSize, iconSize);
  doc.textWithLink(` ${info.GitHub}`, 24, y + 3,{url:info["GitHub Link:"]});
  y += 12;
  checkAndAddPage();
}

if(info.Education.length!=0)
{
  // Education
  doc.setFontSize(18);
  doc.text('Education', 20, y);
  doc.setLineWidth(0.3);
  doc.line(20, y + 2, 190, y + 2);
  y += 9;
  checkAndAddPage();

  info.Education.forEach((edu) => {
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(`• ${edu.degree}`, 20, y);
    doc.setFontSize(12);
    doc.setFont("Times New Roman", "italic");
    doc.text(`${edu.from}-${edu.to}`, 165, y);
    y += 6;
    checkAndAddPage();

    doc.setFontSize(12);
    doc.text(`  ${edu.college}`, 20, y);
    doc.setFont(undefined, 'normal');
    doc.text(`${edu.displayGradeAs}: ${edu.grade}`, 165, y);
    y += 15;
    checkAndAddPage();
  });
}

if(info.Projects.length!=0){
  // Projects
  doc.setFontSize(18);
  y += 5;
  checkAndAddPage();
  doc.text('Personal Projects', 20, y);
  doc.setLineWidth(0.3);
  doc.line(20, y + 2, 190, y + 2);
  y += 8;
  checkAndAddPage();

  info.Projects.forEach((proj) => {
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.textWithLink(`• ${proj.title}`, 20, y,{url:proj.link});
    y += 6;
    checkAndAddPage();

    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    let lineHeight = 6;
    const wrappedLines = doc.splitTextToSize(proj.desc, 170);
    wrappedLines.forEach((line) => {
      doc.text(line, 20, y);
      y += lineHeight;
      checkAndAddPage();
    });
    proj.feat.forEach((feat) => {
      doc.text(`- `, 24, y);
      const featLines = doc.splitTextToSize(feat, 164);
      featLines.forEach((line) => {
        doc.text(line, 26, y);
        y += lineHeight;
        checkAndAddPage();
      });
    });
    y += 4;
    checkAndAddPage();
  });
}

if(info.TechnicalSkills.length!=0){
  // Technical Skills
  doc.setFontSize(18);
  y += 5;
 checkAndAddPage();
  doc.text('Technical Skills', 20, y);
  doc.setLineWidth(0.3);
  doc.line(20, y + 2, 190, y + 2);
  y += 8;
  checkAndAddPage();

  info.TechnicalSkills.forEach((skill) => {
    doc.setFontSize(13);
    doc.setFont(undefined, "bold");
    doc.text(`${skill.heading}: `, 20, y);
    const headingWidth = doc.getTextWidth(`${skill.heading}: `);
    doc.setFont(undefined, "normal");
    doc.setFontSize(12);
    let lineHeight = 6;
    const wrappedLines = doc.splitTextToSize(skill.desc, 170 - (headingWidth + 1));
    wrappedLines.forEach((line) => {
      doc.text(line, 20 + headingWidth + 1, y);
      y += lineHeight;
      checkAndAddPage();
    });
  });
  y += 4;
  checkAndAddPage();
}


if(info.Achievements.length!=0){
  // Achievements
  doc.setFontSize(18);
  doc.text('Achievements', 20, y);
  doc.setLineWidth(0.3);
  doc.line(20, y + 2, 190, y + 2);
  y += 8;
  checkAndAddPage();

  info.Achievements.forEach((ach) => {
    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text(`- ${ach.title}`, 20, y);
    doc.setFont(undefined, "normal");
    y += 6;
    checkAndAddPage();

    let lineHeight = 6;
    const wrappedLines = doc.splitTextToSize(ach.desc, 170);
    wrappedLines.forEach((line) => {
      doc.text(line, 20, y);
      y += lineHeight;
      checkAndAddPage();
    });
  });
}

  // Save PDF
  doc.save('resume.pdf');
};

export { generatePDF };