import setupTest from '../helpers/setup-test';
import App from '../../src';

QUnit.module('planet', function(hooks) {
  const context = setupTest(App, hooks);

  QUnit.module('empty', function() {
    QUnit.test('findRecords', async function(assert) {
      const response = await context.request('/planets');

      assert.deepEqual(response.body, { data: [] });
    });

    QUnit.test('findRecord', async function(assert) {
      const response = await context.request('/planets/earth');

      assert.equal(response.status, 404);
    });
  });

  QUnit.module('with record', function(hooks) {
    hooks.beforeEach(async function() {
      await context.request('/planets', {
        method: 'POST',
        payload: {
          data: {
            type: 'planets',
            id: 'earth',
            attributes: {
              name: 'Earth'
            }
          }
        }
      });
    });

    QUnit.test('findRecords', async function(assert) {
      const response = await context.request('/planets');

      assert.deepEqual(response.body, {
        data: [
          {
            type: 'planets',
            id: 'earth',
            attributes: {
              name: 'Earth'
            }
          }
        ]
      });
    });

    QUnit.test('findRecord', async function(assert) {
      const response = await context.request('/planets/earth');

      assert.deepEqual(response.body, {
        data: {
          type: 'planets',
          id: 'earth',
          attributes: {
            name: 'Earth'
          }
        }
      });
    });
  });
});
