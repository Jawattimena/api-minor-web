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

## Dag 4

vandaag heb ik de prompt API toegevoegd aan het project. Ik kreeg de prompt API wel aan de praat alleen koos hij nog niet verschillende quotes.

## Dag 5

vandaag heb ik samen met Jad gekeken naar waar het probleem zit om de quote API juist te laten kiezen welke quote het beste past. Het blijkt dat de API maar 10 quotes heeft en dus moeilijker een keuze kan maken en sneller de zelfde quote kiest.

Nu is het gelukt om de Prompt API verschillende keuzes te kunnen maken


## Reflectie

**Wat heb ik geleerd**

- hoe je een prompt API werkt en hoe je doormiddel van een prompt iets kan laten gebeuren.
- Hoe je informatie in de localstorage kan opslaan en dat kan gebruiken en dat als er informatie mist in de local storage mist dat er dan opnieuw om die informatie gevraagd word
- Hoe je dingen uit de local storage ophaalt en laat zien in je website.
- Dat je niet zomaar je API key online moet laten staan want anders kan het je heel veel geld kosten als het een betaalde API is.

**Bevindingen**

- Ik merk dat ik een astro project nog niet helemaal begrijp en dat er nog zoveel meer is in de web dev wereld dan alleen maar coderen.
- Het web kan nog complexer zijn dan ik dacht en het is niet alleen maar coderen.

**Wat vond ik het leukst**

- Ik vond de localstorage en de prompt API het interesantst. om mee bezig te zijn
    - Prompt API zou je zoveel dingen mee kunnen doen en laten gebeuren.
    - en met de local storage kan je informatie in opslaan en die informatie verder gebruiken in de website.

**Wat kan er beter**

- Aangezien het voor mij best wel ingewikkeld was is het voor mij beter om het de flow en het systeem van hoe dingen moet verlopen nog beter uit te tekenen en e uit te denken. dat gaat mij veel beter helpen om een juiste structuur te maken.
- Betere structuur in mijn code

