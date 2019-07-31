import { pluralize, singularize } from 'inflected';
import { Schema, ModelDefinition } from '@orbit/data';
import { Plugin, SQLSource } from '@orbit-server/fastify';
import plugin from 'fastify-plugin';

import schemaJson from './schema.json';

module.exports = plugin(function(fastify, _, next) {
  const schema = new Schema({
    models: schemaJson.models as Record<string, ModelDefinition>,
    pluralize,
    singularize
  });
  const source = new SQLSource({
    schema,
    knex: {
      client: 'sqlite3',
      connection: { filename: ':memory:' },
      useNullAsDefault: true
    }
  });

  fastify.register(Plugin, {
    source,
    jsonapi: true,
    graphql: true
  });

  next();
});
