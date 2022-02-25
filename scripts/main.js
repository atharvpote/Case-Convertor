"use strict";

const upperCase = document.getElementById("upper-case");
const lowerCase = document.getElementById("lower-case");
const properCase = document.getElementById("proper-case");
const sentenceCase = document.getElementById("sentence-case");
const saveTextFile = document.getElementById("save-text-file");
const textarea = document.querySelector("textarea");

upperCase.addEventListener(
  "click",
  () => (textarea.value = textarea.value.toUpperCase())
);

lowerCase.addEventListener(
  "click",
  () => (textarea.value = textarea.value.toLowerCase())
);

properCase.addEventListener("click", () => {
  textarea.value = textarea.value
    .toLowerCase()
    .split(" ")
    .map((word) => {
      word = word.split("");

      const firstLetter = word.splice(0, 1).join("").toUpperCase();

      return firstLetter + word.join("");
    })
    .join(" ");
});

sentenceCase.addEventListener("click", convertToSentenceCase);

function firstLetterUpper(sentence) {
  const sentenceCased = sentence
    .toLowerCase()
    .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (firstLetter) =>
      firstLetter.toUpperCase()
    );

  return sentenceCased;
}

saveTextFile.addEventListener("click", () =>
  download("text.txt", textarea.value)
);

function convertToSentenceCase() {
  const theString = textarea.value;
  const newString = firstLetterUpper(theString);
  textarea.value = newString;
}

function download(filename, text) {
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// Start file download.
// download("hello.txt","This is the content of my file :)");
