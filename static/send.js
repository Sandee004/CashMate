// Get references to the input field, keypad buttons container, and backspace button
const inputField = document.getElementById("inputField");
const keypadButtons = document.getElementById("keypadButtons");
const backspaceButton = document.getElementById("backspaceButton");

// Event listener for input field click
inputField.addEventListener("click", () => {
  keypadButtons.style.display = "block";
});

// Generate the keypad buttons dynamically
buttons.forEach(button => {
  const buttonElement = document.createElement("div");
  buttonElement.classList.add("button");
  buttonElement.textContent = button;
  buttonElement.addEventListener("click", () => {
    inputField.value += button;
  });
  keypadButtons.appendChild(buttonElement);
});

// Add functionality to the backspace button
backspaceButton.addEventListener("click", () => {
  inputField.value = inputField.value.slice(0, -1);
});
    