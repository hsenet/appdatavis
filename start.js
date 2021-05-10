const app = require('./app');
const mustacheExpress = require('mustache-express');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname+ '/src/templates');
const server = app.listen(3000, () => {
    console.log(`Server started on port: ${server.address().port}`);
});