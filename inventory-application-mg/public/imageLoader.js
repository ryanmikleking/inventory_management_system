import Tesseract from "tesseract.js";
//import React, { useState } from 'react';

const imageLoader = document.getElementById("imageLoader");

imageLoader.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // 1. Recognize text from the image
  const {
    data: { text },
  } = await Tesseract.recognize(file, "eng", {
    logger: (m) => console.log(m), // Optional: tracks progress
  });

  console.log("Extracted Text:", text);

  // 2. Simple logic to map text to fields (Customizable)
  fillForm(text);
});

function fillForm(rawText) {
  // Example: Find a name (assumes name follows "Name:" in the text)
  const nameMatch = rawText.match(/Name:\s*(.*)/i);
  if (nameMatch) {
    document.getElementById("nameField").value = nameMatch[1].trim();
  }

  // Example: Find a date (MM/DD/YYYY format)
  const dateMatch = rawText.match(/\d{2}\/\d{2}\/\d{4}/);
  if (dateMatch) {
    document.getElementById("dateField").value = dateMatch[0];
  }
}
