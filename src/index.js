/* eslint-disable no-console */
import express from 'express';
import passport from 'passport';
import './middleware/passport';
import v1 from './api/v1';

const app = express();
app.use(passport.initialize());
app.use(express.json());
app.use('/api', v1);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export default app;
