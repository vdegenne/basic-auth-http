# http-basic-auth

A simple object to implement http basic authentication.

## Usage

```javascript
import {Basic as auth} from 'http-basic-auth';

const app = express();
const auth = new Auth({
  file: '/path/to/user-password-pairs'
});

app.use((req, res, next) => {
  // returns 401 Unauthorized if check doesn't pass (the callback is not called, no next).
  auth.check(req, res, (err: Error) => {
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

## Installation

```bash
yarn add http-basic-auth
```

## Notes

This is just a bit of code that I wrote for testing and for implementing in a private architecture. Use with caution. If you really want to secure your application you should also make use of https to encrypt the headers because http authorization is sending plain passwords in the request. If you wish to contribute you can propose a PR on the related github, I'd be glad to improve this tiny api.