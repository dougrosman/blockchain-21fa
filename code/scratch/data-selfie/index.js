const express = require('express');
const app = express();

app.listen(3000, () => console.log('listening at 3000'));

// things i want this app to do:
// 1. serve web pages (in this case, index.html)
// 2. save information to a database
// 3. retrieve information from a database
// 4. authentication on the server

app.use(express.static('public'));