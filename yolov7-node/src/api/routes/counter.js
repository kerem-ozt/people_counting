import CounterController from '../controllers/counter.js';
import express from 'express';

const CounterRouter = express.Router();

CounterRouter.get('/run', CounterController.runDetector);
CounterRouter.get('/runsave', CounterController.runDetectorSaveData);
CounterRouter.get('/test', CounterController.test);
CounterRouter.get('/normaltest', CounterController.testWithNormalDatabase);
CounterRouter.get('/son', CounterController.son);

export default CounterRouter;