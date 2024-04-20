let buttons = document.getElementsByClassName("download");

// Adding event listener to all the buttons, to open the corresponding pdf in a new tab when clicked.
for (const button of buttons) {
  button.addEventListener("click", function () {
    let pdfPath;
    if (button.textContent.includes("C Notes")) {
      pdfPath =
        "./Pdfs/All-You-Need-To-Know-About-Programming-As-A-Beginner.pdf";
    }
    window.open(pdfPath, "_blank");
  });
}
