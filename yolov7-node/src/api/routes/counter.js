import CounterController from '../controllers/counter.js';
import express from 'express';

const CounterRouter = express.Router();

CounterRouter.get('/run', CounterController.runDetector);
CounterRouter.get('/runsave', CounterController.runDetectorSaveData);

export default CounterRouter;