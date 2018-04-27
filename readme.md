# http-basic-auth

A simple object to implement http basic authentication.

## Usage

```javascript
import {Basic as BasicAuth} from 'http-basic-auth';

const app = express();
const basic = new Basic({
  file: '/path/to/user-password-pairs'
});

app.use((req, res, next) => {
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
