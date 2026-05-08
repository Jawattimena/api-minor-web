import { json } from "astro:schema";


const savedName = localStorage.getItem("name");


// Begroeting met tijd van de dag "Good morning/afternoon/evening"
function getGreeting() {
  const now = new Date();
  const hour = now.getHours();
  if (hour < 12) return "Good morning";
  else if (hour < 18) return "Good afternoon";
  else return "Good evening";
}

document.getElementById("begroeting").textContent = `👋 ${getGreeting()} ${savedName}`;


const savedAnswers =
localStorage.getItem("How do you feel right now in a few words?") &&
localStorage.getItem("How would you describe your current energy level?") &&
localStorage.getItem("Which of these emotions best matches your current mood?") &&
localStorage.getItem("What do you need most right now?") &&
localStorage.getItem("How do you feel about the near future (today / tomorrow)?");

const formName = document.querySelector("#formName");
const formQuestions = document.querySelector("#formQuestions");
const dailyQuote = document.querySelector("#dailyQuote");

clearAnswersIfNewDay();

if (savedName && savedAnswers) {
  formName.style.display = "none";
  formQuestions.style.display = "none";
  dailyQuote.style.display = "flex";
  
  // laat de button zien als er al een quote is gekozen
  const newDayButton = document.getElementById("newDay");
  newDayButton.style.display = "block";    

  const savedQuote = localStorage.getItem("dailyQuote");
  const savedAuthor = localStorage.getItem("dailyQuoteAuthor");

  if (savedQuote && savedAuthor) {
    document.getElementById("quoteText").textContent = JSON.parse(savedQuote);
    document.getElementById("quoteAuthor").textContent = `- ${JSON.parse(savedAuthor)} -`;
  }
} 

else if (savedName) {
  formName.style.display = "none";
  formQuestions.style.display = "flex";
  dailyQuote.style.display = "none";
} else {
  formName.style.display = "flex";
  formQuestions.style.display = "none";
  dailyQuote.style.display = "none";
}

if (formName) formName.addEventListener("submit", nameSubmit);
if (formQuestions) formQuestions.addEventListener("submit", awnsersSubmit);

function dataName() {
  const name = document.getElementById("name").value;
  localStorage.setItem("name", name);
  formName.style.display = "none";
  formQuestions.style.display = "flex";
}

function getSelectedRadioAnswer2() {
  const radios = document.getElementsByName("vraag-2");
  for (let radio of radios) { if (radio.checked) return radio.id; }
}

function getSelectedRadioAnswer3() {
  const radios = document.getElementsByName("vraag-3");
  for (let radio of radios) { if (radio.checked) return radio.id; }
}

function getSelectedRadioAnswer5() {
  const radios = document.getElementsByName("vraag-5");
  for (let radio of radios) { if (radio.checked) return radio.id; }
}

function nameSubmit(event) {
  event.preventDefault();
  dataName();
}

async function awnsersSubmit(event) {
  event.preventDefault();
  await dataQuestions();
}

// Reset antwoorden en quote als het een nieuwe dag is 
function clearAnswersIfNewDay() {
  const today = new Date().toDateString();
  const lastVisit = localStorage.getItem("lastVisitDate");

  if (lastVisit !== today) {
  localStorage.removeItem("How do you feel right now in a few words?");
  localStorage.removeItem("How would you describe your current energy level?");
  localStorage.removeItem("Which of these emotions best matches your current mood?");
  localStorage.removeItem("What do you need most right now?");
  localStorage.removeItem("How do you feel about the near future (today / tomorrow)?");

  // Verwijder de opgeslagen quote
  localStorage.removeItem("dailyQuote");
  localStorage.removeItem("dailyQuoteAuthor");

  // Verwijder de datum zodat clearAnswersIfNewDay ook opnieuw werkt
  localStorage.removeItem("lastVisitDate");

  // Reset de UI
  const newDayButton = document.getElementById("newDay"); 
  dailyQuote.style.display = "none";
  newDayButton.style.display = "none";
  formQuestions.style.display = "flex";

  // Reset de quote tekst
  document.getElementById("quoteText").textContent = "";
  document.getElementById("quoteAuthor").textContent = "";
  }
  localStorage.setItem("lastVisitDate", today);
}

async function init() {
  const availability = await LanguageModel.availability();
  console.log("AI Status:", availability);

  if (availability !== "available") {
    console.log("Model nog niet klaar:", availability);
    return;
  }

// Hier download ik de prompt API
  const session = await LanguageModel.create({
    expectedInputLanguages: ["en"],  
    expectedContextLanguages: ["en"],
    monitor(m) {
      m.addEventListener("downloadprogress", (e) => {
        console.log(`Downloaded ${e.loaded * 100}%`);
      });
    },
  });

  const quotesElement = document.getElementById("quotesData");
  const quotes = JSON.parse(quotesElement.dataset.quotes);

  // Hier kies ik de quote met de Prompt API
  // Bronnen: Samen met Jad opgelost om de Prompt API werkende te krijgen, en deze functie te schrijven.
  async function kiesQuoteMetAI(quotes) {
    const antwoord1 = localStorage.getItem("How do you feel right now in a few words?");
    const antwoord2 = localStorage.getItem("How would you describe your current energy level?");
    const antwoord3 = localStorage.getItem("Which of these emotions best matches your current mood?");
    const antwoord4 = localStorage.getItem("What do you need most right now?");
    const antwoord5 = localStorage.getItem("How do you feel about the near future (today / tomorrow)?");

    const quotesLijst = quotes
      .map((q, index) => `${index + 1}. "${q.quote}" - ${q.author}`)
      .join("\n");

      // hier word de promt uitgeschreven die aan de AI gegeven word
      const prompt = `
      Een gebruiker heeft de volgende vragen beantwoord:
      1. Hoe voel je je nu? ${antwoord1}
      2. Energieniveau: ${antwoord2}
      3. Emotie: ${antwoord3}
      4. Wat heb je nodig? ${antwoord4}
      5. Gevoel over de toekomst: ${antwoord5}

      Hier zijn alle beschikbare quotes:
      ${quotesLijst}
  
      Lees alle quotes hierboven. Kies de quote die het beste aansluit bij hoe de gebruiker zich voelt.
      Geef ALLEEN het nummer van de gekozen quote terug (bijvoorbeeld: 3).
      Geen uitleg, geen tekst, alleen het getal.`;

    const antwoord = await session.prompt(prompt);
    console.log(prompt);
    console.log(antwoord);
    console.log(session);

    // Hier check ik wat de AI teruggeeft in de console
    console.log("AI antwoord (raw):", antwoord);

    const gekozenNummer = parseInt(antwoord.trim()) - 1;
    console.log(gekozenNummer);
    console.log(quotes[gekozenNummer]);
    return quotes[gekozenNummer] || quotes[0];

  }

  // dataQuestions heeft toegang tot kiesQuoteMetAI via init()
  async function dataQuestions() {
    const answer1 = document.getElementById("vraag-1").value;
    const answer2 = getSelectedRadioAnswer2();
    const answer3 = getSelectedRadioAnswer3();
    const answer4 = document.getElementById("vraag-4").value;
    const answer5 = getSelectedRadioAnswer5();

    localStorage.setItem("How do you feel right now in a few words?", answer1);
    localStorage.setItem("How would you describe your current energy level?", answer2);
    localStorage.setItem("Which of these emotions best matches your current mood?", answer3);
    localStorage.setItem("What do you need most right now?", answer4);
    localStorage.setItem("How do you feel about the near future (today / tomorrow)?", answer5);

    formQuestions.style.display = "none";
    document.getElementById("begroeting").textContent = "Even geduld, er wordt een quote gekozen...";
    dailyQuote.style.display = "flex";



    const gekozenQuote = await kiesQuoteMetAI(quotes);

    // Hier log ik de volledige quote in de console
    console.log("Gekozen quote:", `"${gekozenQuote.quote}" - ${gekozenQuote.author}`);
    
    // Hier sla ik de quote op in localStorage
    localStorage.setItem("dailyQuote", JSON.stringify(gekozenQuote.quote));
    localStorage.setItem("dailyQuoteAuthor", JSON.stringify(gekozenQuote.author));

    const savedName = localStorage.getItem("name");
    document.getElementById("begroeting").textContent = `👋 ${getGreeting()} ${savedName}`;
    document.getElementById("quoteText").textContent = gekozenQuote.quote;
    document.getElementById("quoteAuthor").textContent = `- ${gekozenQuote.author} -`;

    const newDayButton = document.getElementById("newDay");
    newDayButton.style.display = "block";    
  }

  // Overschrijf de awnsersSubmit zodat die de lokale dataQuestions gebruikt
  if (formQuestions) {
    formQuestions.removeEventListener("submit", awnsersSubmit);
    formQuestions.addEventListener("submit", async (event) => {
      event.preventDefault();
      await dataQuestions();
    });
  }
}

// Functie voor simulatie new day button
function newDay() {
  // Verwijder alle antwoorden
  localStorage.removeItem("How do you feel right now in a few words?");
  localStorage.removeItem("How would you describe your current energy level?");
  localStorage.removeItem("Which of these emotions best matches your current mood?");
  localStorage.removeItem("What do you need most right now?");
  localStorage.removeItem("How do you feel about the near future (today / tomorrow)?");

  // Verwijder de opgeslagen quote
  localStorage.removeItem("dailyQuote");
  localStorage.removeItem("dailyQuoteAuthor");

  // Verwijder de datum zodat clearAnswersIfNewDay ook opnieuw werkt
  localStorage.removeItem("lastVisitDate");

  // Reset de UI
  const newDayButton = document.getElementById("newDay"); 
  dailyQuote.style.display = "none";
  newDayButton.style.display = "none";
  formQuestions.style.display = "flex";


  // Reset de quote tekst
  document.getElementById("quoteText").textContent = "";
  document.getElementById("quoteAuthor").textContent = "";

  // Reload de pagina
  location.reload();
}
// new day button
document.getElementById("newDay").addEventListener("click", newDay);

init();