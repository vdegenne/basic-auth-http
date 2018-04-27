import * as chai from 'chai';
import * as express from 'express';


const assert = chai.assert;

suite('Basic auth', () => {

  const app: express.Express;

  setup(() => {
    app = express();

  });

  test('', () => {
    assert.equal(true, true);
  });
});
