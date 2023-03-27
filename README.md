# 3D Scene Editor

## Anforderungen

- NodeJS Version > 18.7.0 installiert

## Installation

`cd ThreeJS-React-Fiber `\
`npm install`

## Inbetriebnahme

Development start: `npm run dev`\
**Die App startet auf http://localhost:3000**

Builden der App: `npm run build`

## App auf Server laden

Den Inhalt des build Ordners in den public Ordner des Servers ziehen

## Neue Standard Modelle hinzufügen

1. FBX Modell in den Ordner `public/ModelsFBX` hinzufügen.
2. Pfad zum FBX Modell, sowie dessen Anzeigenamen in `src/Main.tsx` in `modelPaths` hinzufügen

## Bekannte Bugs

Beim Laden einer gespeicherten Szene mit von Usern hinzugefügten Modellen kann es dazu kommen, dass die Szene nicht geladen werden kann. Da die FBX Modelle als blob hinterlegt sind, kann es bei manchen dazu kommen, dass sie auf einen Pfad zugreifen wollen, welcher sehr wahschreinlich durch CORS nicht erlaubt wird.

## Sonsitiges

Die App basiert auf den Technologien

- React https://react.dev/
- ThreeJS https://threejs.org/docs/
- Fiber https://docs.pmnd.rs/react-three-fiber/getting-started/introduction
