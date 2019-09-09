# Orbit Server Template [![Build Status](https://github.com/tchak/orbit-server-template/workflows/CI/badge.svg)](https://github.com/tchak/orbit-server-template/actions)

A template repository for [orbit-server](https://github.com/tchak/orbit-server)

## Usage

``` bash
yarn install
yarn start
```

You should have a server running on `http://localhost:3000`.
With default configuration it exposes an in-memory `sqlite` database through a `JSONAPI` and a `GraphQL` endpoints.
You can explore `GraphQL` schema by going to `http://localhost:3000/graphql`.
You can change the schema by editing `schema.json`.

You can print all available endpoints by running:

``` bash
yarn routes
```

## License

MIT License (see LICENSE for details).
