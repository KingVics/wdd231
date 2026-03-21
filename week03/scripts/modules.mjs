import byuiCourse from "./course.mjs";
import setSectionSelection from "./sections.mjs";
import { setTitle, renderSections, changeEnrollment } from "./output.mjs";



document.querySelector("#enrollStudent").addEventListener("click", function () {
    const sectionNum = Number(document.querySelector("#sectionNumber").value);
    changeEnrollment(sectionNum,byuiCourse.sections);
    renderSections(byuiCourse.sections);
});
document.querySelector("#dropStudent").addEventListener("click", function () {
    const sectionNum = Number(document.querySelector("#sectionNumber").value);
    changeEnrollment(sectionNum,byuiCourse.sections, false);
    renderSections(byuiCourse.sections);
});

setTitle(byuiCourse);
setSectionSelection(byuiCourse.sections);
renderSections(byuiCourse.sections);