import CounterController from '../controllers/counter.js';
import express from 'express';
import checkAuth from '../../utils/auth.js';

const CounterRouter = express.Router();

CounterRouter.get('/run', checkAuth, CounterController.runDetector);
CounterRouter.get('/runandsave', CounterController.runAndSave);
CounterRouter.delete('/delete', CounterController.delete);
CounterRouter.get('/getAllWithParam', CounterController.getAllWithParam);

// CounterRouter.get('/runsave', CounterController.runDetectorSaveData);
// CounterRouter.get('/normaltest', CounterController.testWithNormalDatabase);
// CounterRouter.get('/son', CounterController.son);
// CounterRouter.get('/getAll', CounterController.getAll);

export default CounterRouter;