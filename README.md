# Orbit Server Template [![Build Status](https://github.com/tchak/orbit-server-template/workflows/CI/badge.svg)](https://github.com/tchak/orbit-server-template/actions)

A template repository for [koa-orbit](https://github.com/tchak/koa-orbit)

## Usage

``` bash
yarn install
yarn dev
```

You should have a server running on `http://localhost:3000`.
With default configuration it exposes an in-memory `sqlite` database through `JSONAPI` endpoints.
You can change the schema by editing `schema.json`.

You can execute tests by running:

``` bash
yarn lint
yarn test
```

## License

MIT License (see LICENSE for details).
