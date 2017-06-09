# Rangle Koa-starter

## Quick Start

This starter works with `npm` or [`yarn`](http://yarnpkg.com).

Install:

```sh
yarn # or npm install
```

Run in dev mode, restarting the server on file changes:

```sh
yarn dev
```

Run unit tests:

```sh
yarn test
```

Run in prod mode, not daemonized, with staging config (suitable for Heroku):

```sh
yarn build
yarn start
```

Start/stop in prod mode, daemonized, with local config:

```sh
yarn build
yarn local:start
yarn local:stop
```

Start/stop in prod mode, daemonized mode, with staging config:

```sh
yarn build
yarn staging:start
yarn staging:stop
```

Build (or update) the API documentation to `api.html` in the root:

```sh
yarn raml
```

