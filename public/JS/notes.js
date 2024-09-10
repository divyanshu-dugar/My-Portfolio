let buttons = document.getElementsByClassName("download");

// Adding event listener to all the buttons, to open the corresponding pdf in a new tab when clicked.
for (const button of buttons) {
  button.addEventListener("click", function () {
    let pdfPath;
    if (button.textContent === "C Notes") {
      pdfPath =
        "https://docs.google.com/document/d/1tT7xC_FIHJm1xOVVPA_WMddSqEzeijsT/edit?usp=sharing&ouid=113501728012545291332&rtpof=true&sd=true";
        window.open(pdfPath, "_blank");
    }else if (button.textContent === "C++ Notes"){
      pdfPath =
        "https://docs.google.com/document/d/1RffeJCgKCoDBj_0y1iY7LMW3_uy5BBek/edit?usp=sharing&ouid=113501728012545291332&rtpof=true&sd=true";
        window.open(pdfPath, "_blank");
      }else if (button.textContent === "OOP | C++ Notes"){
        pdfPath =
          "https://docs.google.com/document/d/1_g1-Cy9d_f-r3pCuNP6ImrlKS68-m_rX/edit?usp=sharing&ouid=113501728012545291332&rtpof=true&sd=true";
          window.open(pdfPath, "_blank");
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
