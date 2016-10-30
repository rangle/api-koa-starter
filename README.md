# Rangle Koa-starter

## Quick Start

Install:

```sh
npm install
```

Run in dev mode, restarting the server on file changes:

```sh
npm run dev
```

Run unit tests:

```sh
npm test
```

Run in prod mode, not daemonized, with staging config (suitable for Heroku):

```sh
npm run build
npm start
```

Start/stop in prod mode, daemonized, with local config:

```sh
npm run build
npm run local:start
npm run local:stop
```

Start/stop in prod mode, daemonized mode, with staging config:

```sh
npm run build
npm run staging:start
npm run staging:stop
```

Build (or update) the API documentation to `api.html` in the root:

```sh
npm run raml
```

## TODO:

* Basic prodmode clustering with throng?
* Basic auth endpoint for other starters to use?
  * with caveats - big blurb on session management
  * protected whoami?
* Jasmine instead of mocha?
* Better coverage numbers, tools.
* Update rangle-starter CLI, README.
