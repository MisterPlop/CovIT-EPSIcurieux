import express from 'express';
import userRouter from '../module/user/router/userRouter';
import dataRouter from '../module/data/router/dataRouter';

const router = express.Router();
router.get('/', (req, res) => {
    res.send('API works !');
});
router.use('/users', userRouter);
router.use('/covid19', dataRouter);
console.log("Routes loaded !");
export default router;