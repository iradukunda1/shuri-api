import { Router } from 'express';

const AllRouters = Router();

AllRouters.get('/', (req, res) => {
  return res.json({ message: 'Welcome to Shuri API V1 Gateway' });
});

export default AllRouters;
