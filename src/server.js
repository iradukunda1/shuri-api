/* eslint-disable no-console */
import express from 'express';

const app = express();

app.use('/', (req, res) => {
  res.json({ message: 'Hello world' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
