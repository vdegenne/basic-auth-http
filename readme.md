# dummy-http-basic-auth

A simple object to implement a dummy http basic authentication.

## Usage

```javascript
import {Basic} from 'dummy-http-basic-auth';

const basic = new Basic({
  file: '/path/to/user-password-pairs'
});

const app = express();

app.use(basic.middleware);
app.get('/secured', (req, res) => {
  res.send('if you see this, you are authenticated');
});
```

If we need more control,

```javascript
app.use((req, res, next) => {
  // no-need-authentication-routes
  if (['/public-route', '/public-script.js'].includes(req.url)) {
    next();
  }
  // else check for authentication
  // basic.loadUsers(); // use this if you need to integrate changes made from the user list file without restarting the server.
  // returns 401 Unauthorized if check doesn't pass (the callback is not called, no next).
  basic.check(req, res, (err: Error) => {
    if (err) {
      next(err);
    }
    else {
      next();
    }
  });
});
```

*You can check the test for more details*


## Notes

This is just a bit of code that I wrote for testing and for implementing in a private architecture. Use with caution. If you really want to secure your application you should also make use of https to encrypt the headers because http authorization is sending plain passwords in the request. If you wish to contribute you can propose a PR on the related github, I'd be glad to improve this tiny api.