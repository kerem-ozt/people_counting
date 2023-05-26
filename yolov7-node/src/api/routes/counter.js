import CounterController from '../controllers/counter.js';
import express from 'express';

const CounterRouter = express.Router();

CounterRouter.get('/run', CounterController.runDetector);
// CounterRouter.get('/runsave', CounterController.runDetectorSaveData);
// CounterRouter.get('/normaltest', CounterController.testWithNormalDatabase);
// CounterRouter.get('/son', CounterController.son);
// CounterRouter.get('/getAll', CounterController.getAll);
CounterRouter.get('/test', CounterController.test);
CounterRouter.delete('/delete', CounterController.delete);
CounterRouter.get('/getAllWithParam', CounterController.getAllWithParam);

export default CounterRouter;