const button = document.querySelector(".btn");
const resume = document.querySelector(".resume-btn");

button.addEventListener("click", function() {
    window.open("https://github.com/divyanshu-dugar","_blank");
    // const anchor = document.createElement("a");
    // anchor.href = "https://github.com/divyanshu-dugar";
    // anchor.target = "_blank";
    // anchor.click();
});

resume.addEventListener("click",()=>{
    const pdfPath = "/Pdfs/Divyanshu_Dugar_Resume.pdf";
    window.open(pdfPath,"_blank") ;
});

