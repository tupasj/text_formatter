const unformattedTextArea = document.getElementById("unformatted-text");
const formattedTextArea = document.getElementById("formatted-text");
const xIcon = document.querySelector(".fa-xmark");
const copyIcon = document.querySelector(".copy-icon");
const copyTextTooltip = document.querySelector(".tooltiptext");

function removeSpaces(str) {
  return str.replace(/\s/g, "");
}

function removeParenthesesContent(str) {
  return str.replace(/ *\([^)]*\) */g, "").replace(/ *\（[^）]*\） */g, "");
}

function formatText(str) {
  const spacesRemoved = removeSpaces(str);
  const formattedText = removeParenthesesContent(spacesRemoved);
  return formattedText;
}

unformattedTextArea.addEventListener("input", () => {
  const unformattedText = unformattedTextArea.value;
  const formattedText = formatText(unformattedText);
  formattedTextArea.value = formattedText;
});

xIcon.addEventListener("click", () => {
  unformattedTextArea.value = "";
  formattedTextArea.value = "";
});

copyIcon.addEventListener("click", () => {
  const textToCopy = formattedTextArea.value;
  navigator.clipboard.writeText(textToCopy).then(() => {
    copyTextTooltip.textContent = "Text copied!";  // Change tooltip text
    copyTextTooltip.classList.add("copied");  // Add "copied" class for styling

    setTimeout(() => {
      copyTextTooltip.textContent = "Copy text";  // Reset tooltip text after 3 seconds
      copyTextTooltip.classList.remove("copied"); // Remove "copied" class
    }, 3000);

  }, () => {
    // Error message (optional)
    console.error("Failed to copy text to clipboard!");
  });
});
