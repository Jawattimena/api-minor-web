clearAnswersIfNewDay();

// Hier check ik of er al een naam staat door em op te vragen
// https://chatgpt.com/share/69ea01f3-df60-83eb-a265-d045b4583faf
const savedName = localStorage.getItem("name");

function getGreeting() {
  const now = new Date();
  const hour = now.getHours(); // 0–23

  if (hour < 12) {
    return "Good morning";
  } else if (hour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}
// Hier laat ik de begroeting zien als er een naam is, anders blijft het leeg
document.getElementById("begroeting").textContent = `👋 ${getGreeting()} ${savedName}`;
// console.log(getGreeting());

const savedAnswers = 
   localStorage.getItem("How do you feel right now in a few words?") 
&& localStorage.getItem("How would you describe your current energy level?") 
&& localStorage.getItem("Which of these emotions best matches your current mood?") 
&& localStorage.getItem("What do you need most right now?") 
&& localStorage.getItem("How do you feel about the near future (today / tomorrow)?");

//  Hier selecteer ik het formulier
const formName = document.querySelector("#formName");
const formQuestions = document.querySelector("#formQuestions");
const dailyQuote = document.querySelector("#dailyQuote");

//   als er een naam is, verberg het formulier, anders laat het zien
if (savedName && savedAnswers) {
  formName.style.display = "none";
  formQuestions.style.display = "none";
  dailyQuote.style.display = "flex"; // of "block"
} else if (savedName) {
  formName.style.display = "none";
  formQuestions.style.display = "flex";
  dailyQuote.style.display = "none";
} else {
  formName.style.display = "flex";
  formQuestions.style.display = "none";
  dailyQuote.style.display = "none";
}

//   als er een formulier is, voeg een event listener toe voor het submitten van het formulier
if (formName) {
  formName.addEventListener("submit", nameSubmit);
}

if (formQuestions) {
  formQuestions.addEventListener("submit", awnsersSubmit);
}

// Hier sla ik de naam op in localStorage en verberg het formulier
function dataName() {
  const name = document.getElementById("name").value;

  localStorage.setItem("name", name);

  console.log("Data saved:", name);

  formName.style.display = "none";
  formQuestions.style.display = "flex";
}

function getSelectedRadioAnswer2(name) {
  const radios = document.getElementsByName("vraag-2");
  
  for (let radio of radios) {
    if (radio.checked) {
      return radio.id; 
    }
  }
}

// Hier haal ik de waarde van de geselecteerde radio button op voor vraag 3
function getSelectedRadioAnswer3(name) {
  const radios = document.getElementsByName("vraag-3");
  
  for (let radio of radios) {
    if (radio.checked) {
      return radio.id; 
    }
  }
}

// Hier haal ik de waarde van de geselecteerde radio button op voor vraag 5
function getSelectedRadioAnswer5(name) {
  const radios = document.getElementsByName("vraag-5");
  
  for (let radio of radios) {
    if (radio.checked) {
      return radio.id; 
    }
  }
}

// Hier sla ik de vragen en antwoorden op in localStorage en verberg het formulier
// https://chatgpt.com/share/69ea00c2-6ac4-83eb-9378-aa3e2e870166
function dataQuestions() {
  const answer1 = document.getElementById("vraag-1").value;
  const answer2 = getSelectedRadioAnswer2("vraag-2");
  const answer3 = getSelectedRadioAnswer3("vraag-3");
  const answer4 = document.getElementById("vraag-4").value;
  const answer5 = getSelectedRadioAnswer5("vraag-5");

  localStorage.setItem("How do you feel right now in a few words?", answer1);
  localStorage.setItem("How would you describe your current energy level?", answer2);
  localStorage.setItem("Which of these emotions best matches your current mood?", answer3);
  localStorage.setItem("What do you need most right now?", answer4);
  localStorage.setItem("How do you feel about the near future (today / tomorrow)?", answer5);

  console.log("Data saved:", answer1);
  console.log("Data saved:", answer2);
  console.log("Data saved:", answer3);
  console.log("Data saved:", answer4);
  console.log("Data saved:", answer5);
  //   console.log("Radio gekozen:", answer3);

  formQuestions.style.display = "none";
  dailyQuote.style.display = "flex";
}

function formData(params) {}

// Hier voorkom ik dat het formulier de pagina herlaadt bij het submitten en roep ik de saveData functie aan
function nameSubmit(event) {
  event.preventDefault();
  console.log("Form submitted");
  dataName();
}

function awnsersSubmit(event) {
  // event.preventDefault();
  console.log("Form submitted");
  dataQuestions();
}


// https://claude.ai/share/db831160-0686-41d3-94e8-bc0643b89679
function clearAnswersIfNewDay() {
  const today = new Date().toDateString();
  const lastVisit = localStorage.getItem("lastVisitDate");

  if (lastVisit !== today) {
    localStorage.removeItem("How do you feel right now in a few words?");
    localStorage.removeItem("How would you describe your current energy level?");
    localStorage.removeItem("Which of these emotions best matches your current mood?");
    localStorage.removeItem("What do you need most right now?");
    localStorage.removeItem("How do you feel about the near future (today / tomorrow)?");

    localStorage.setItem("lastVisitDate", today);
    console.log("New day — answers cleared.");
  }
}