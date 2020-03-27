# [FullCalendar](https://github.com/fullcalendar/fullcalendar) in [Apps Script](https://developers.google.com/apps-script)

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

Using [webpack](https://webpack.js.org/) and clasp to get FullCalendar into an Apps Script web app.

## Current workflow
* edit `js/main.js`
* `npm run build`
* manually add `<script>` tags around the output file, `dist/js/bundle.js` (TODO: automate this)
* run `clasp push` from `dist`

## Project structure
js source files are in the project root `js` dir.
`dist` is the root directory for what is uploaded to Apps Script, so run `clasp` from there.
`dist` contains `js` for client javascript (must be inline scripts with `.html` extensions), `gs` for server javascript, `html` for html.
