function saveData() {
  const name = document.getElementById("name").value;
  localStorage.setItem("name", name);
  console.log("Data saved:", name);
}

function formSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  console.log("Form submitted");
  saveData();
}
