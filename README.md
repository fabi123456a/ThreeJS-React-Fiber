# 3D Scene Editor

## Anforderungen

- NodeJS Version > 18.7.0 installiert

## Installation

`cd ThreeJS-React-Fiber `\
`npm install`

## Inbetriebnahme

Development start: `npm run start`\
**Die App startet auf http://localhost:3000**

Builden der App: `npm run build`

## App auf Server laden

Den Inhalt des build Ordners in den public Ordner des Servers ziehen

## Bekannte Bugs

Beim Laden einer gespeicherten Szene mit von Usern hinzugefügten Modellen kann es dazu kommen, dass die Szene nicht geladen werden kann. Da die FBX Modelle als blob hinterlegt sind, kann es bei manchen dazu kommen, dass sie auf einen Pfad zugreifen wollen, welcher durch CORS nicht erlaubt wird. Hier muss die option Zugriff zu diesen Pfaden zu erlauben aktiviert werden.
