# [FullCalendar](https://github.com/fullcalendar/fullcalendar) in [Apps Script](https://developers.google.com/apps-script)

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

Based off of the [FullCalendar Rollup Example](https://github.com/fullcalendar/fullcalendar-example-projects/tree/master/rollup),
this embeds FullCalendar into a Google Apps Script web app.

## Dependencies

- [FullCalendar](https://github.com/fullcalendar/fullcalendar) (local)
- [rollup](https://rollupjs.org/) (local)
- tool for inlining (see [inline](https://github.com/dwmorrin/py-inline) for my python based tool) (global)
- make (global)
- clasp (global)

The local dependencies will be downloaded by running

```shell
npm install
```

## Starting

The build directory needs an appsscript.json from your Apps Script project.
New projects: `clasp create --rootDir build`.
Existing projects can use `clasp clone --rootDir build [projectID]`.
Once you have a `.clasp.json` file, you can open the project in a browser with
`clasp open`.

## Build & Push

`make` will update the build directory, which is sync'd with Apps Script.

```shell
make
```

The `push` target just runs `clasp push` with the power of `make`. It creates
an empty file `./push` to keep track of the last time you pushed.

```shell
make push
```
