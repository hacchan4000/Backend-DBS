// ini untuk jalanin / entry point server
import app from '../app.js';

const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost'

app.listen(port, host, () => {
    console.log(`Running on ${port}`);
});
  