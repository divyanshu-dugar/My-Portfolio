let buttons = document.getElementsByClassName("download");

// Adding event listener to all the buttons, to open the corresponding pdf in a new tab when clicked.
for (const button of buttons) {
  button.addEventListener("click", function () {
    let pdfPath;
    if (button.textContent.includes("C Notes")) {
      pdfPath =
        "/Pdfs/C-Notes.pdf";
        window.open(pdfPath, "_blank");
    }else{
      
    }
    // else if(button.textContent.includes("C++ Notes")){
    //   pdfPath =
    //     "./Pdfs/All-You-Need-To-Know-About-Programming-As-A-Beginner.pdf";
    // }else if(button.textContent.includes("Java Notes")){
    //   pdfPath =
    //     "./Pdfs/All-You-Need-To-Know-About-Programming-As-A-Beginner.pdf";
    // }else if(button.textContent.includes("JavaScript Notes")){
    //   pdfPath =
    //     "./Pdfs/All-You-Need-To-Know-About-Programming-As-A-Beginner.pdf";
    // }else if(button.textContent.includes("Python Notes")){
    //   pdfPath =
    //     "./Pdfs/All-You-Need-To-Know-About-Programming-As-A-Beginner.pdf";
    // }
  });
}
