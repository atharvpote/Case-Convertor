"use strict";

const upperCase = document.getElementById("upper-case");
const lowerCase = document.getElementById("lower-case");
const properCase = document.getElementById("proper-case");
const sentenceCase = document.getElementById("sentence-case");
const saveTextFile = document.getElementById("save-text-file");
const textarea = document.querySelector("textarea");

upperCase.addEventListener("click", convertToUpperCase);
lowerCase.addEventListener("click", convertToLowerCase);
properCase.addEventListener("click", convertToProperCase);
sentenceCase.addEventListener("click", convertToSentenceCase);
saveTextFile.addEventListener("click", downloadTextFile);

function firstLetterUpper(sentence) {
  const sentenceCased = sentence
    .toLowerCase()
    .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (firstLetter) =>
      firstLetter.toUpperCase()
    );

  return sentenceCased;
}

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

function convertToUpperCase() {
  textarea.value = textarea.value.toUpperCase();
}

function convertToLowerCase() {
  textarea.value = textarea.value.toLowerCase();
}

function convertToProperCase() {
  textarea.value = textarea.value
    .toLowerCase()
    .split(" ")
    .map((word) => {
      word = word.split("");

      const firstLetter = word.splice(0, 1).join("").toUpperCase();

      return firstLetter + word.join("");
    })
    .join(" ");
}

function downloadTextFile() {
  download("text.txt", textarea.value);
}
