# Blog

## Dag 1

Vandaag heb ik een idee bedacht om 2 web API’s en 1 content API te intergreren in de website.

MIjn concept is om een quote api te gebruiken. De website haalt een toepasselijke quote uit de api voor de persoon die de dagelijkse quote zou willen. 

Het doel met dit idee is om mensen te bemoedigen of te helpen met deze woorden.

De website stelt eerst een paar cruciale vragen van de persoon voor die dag. met deze vragen wil ik dat doormiddel van web AI begrijpt hoe de persoon zich voelt en welke text het beste bij de persoon past voor die dag. want ja, elke dag is weer anders. 

Deze quote blijft 1 dag staan en vervalt weer bij de volgende dag waarbij de persoon weer opnieuw de zelfde vragen krijgt. De persoon kan de quote ook opslaan waarbij de datum ook wordt op geslagen als ene soort archief om later terug te kunnen lezen. Hiervoor is dan ook een local storage nodig.

Ik wil ook de gebruiker persoonlijk begroeten bij hun voornaam. Dit wil ik ook in de local storage plaatsen zodat die vraag niet elke dag opnieuw gevraagd word.

Ook wil ik dat de web AI de quote analiseert en begrijpt welk gevoel de quote geeft en hiermee het gevoel van de website kan aanpassen.

## WEEK 1

Feedback: Jad

Maak gebruik van animaties of view transitions om het genoeg te maken.


## Dag 2

vandaag heb ik een local storage toegevoegd met hulp van Cyd. ik kan nu mijn naam opslaan en er staat ook naam bij in de local storage. verder vind ik het nog wel een uitdaging om de hele vragen lijst met javascript interactief te maken.

## WEEK 2

Feedback: Jad

Leg de focus op de content API

## Dag 3

vandaag heb ik samen met Jad de content api toegevoegd. Ik heb geleerd dat je de key van een content API nooit openbaar moet zetten en altijd in ed .env zetten zodat het niet public gaat.

## WEEK 4

Feedback Jad:

Ik mis nog een web ai en daar moet ik iets meer voorrang aan geven zegt Jad later kan je ik kijken naar het opslaan van de quotes als ik daar nog tijd voor heb



# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
