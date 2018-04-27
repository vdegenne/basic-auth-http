import * as chai from 'chai';
import * as express from 'express';
import {createReadStream} from 'fs';
import * as supertest from 'supertest';

import {Basic} from '../auth/basic';


const assert = chai.assert;

const root = `${__dirname}/../../fixtures`;

suite('Basic auth', () => {
  let app: express.Express;

  setup(() => {
    app = express();
    const basic = new Basic({file: root + '/user-passwd-pairs'});
    app.use((req, res, next) => {
      basic.check(req, res, (err: Error) => {
        if (err) {
          next(err);
        } else {
          next();
        }
      });
    });
    app.get('/secret-file.txt', (req, res) => {
      createReadStream(root + '/secret-file.txt').pipe(res);
    });
  });

  test('can\'t access without any password', async() => {
    await supertest(app).get('/secret-file.txt').expect(401);
  });

  test('bob can access', async() => {
    await supertest(app)
        .get('/secret-file.txt')
        .set('Authorization', `Basic ${toBase64('bob:secret')}`)
        .expect(200, 'This is a secret file.');
  });

  test('alice can\'t access', async() => {
    await supertest(app)
        .get('/secret-file.txt')
        .set('Authorization', `Basic ${toBase64('alice:wrongpassword')}`)
        .expect(401, '401 Unauthorized');
  });
});


const toBase64 = (input: string) => {
  return Buffer.from(input).toString('base64');
}