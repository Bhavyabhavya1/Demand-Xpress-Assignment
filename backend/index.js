const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const contactsRouter = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/contacts', contactsRouter);

app.get('/', (req, res) => {
  res.send({ message: 'Contact Book API is running' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
