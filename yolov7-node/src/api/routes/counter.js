import CounterController from '../controllers/counter.js';
import express from 'express';
import { verifyToken } from '../../utils/verifyToken.js';

const CounterRouter = express.Router();

CounterRouter.get('/run', verifyToken, CounterController.runDetector);
CounterRouter.get('/runandsave', CounterController.runAndSave);
CounterRouter.delete('/delete', verifyToken, CounterController.delete);
CounterRouter.post('/getAllWithParam', CounterController.getAllWithParam);

// CounterRouter.get('/runsave', CounterController.runDetectorSaveData);
// CounterRouter.get('/normaltest', CounterController.testWithNormalDatabase);
// CounterRouter.get('/son', CounterController.son);
// CounterRouter.get('/getAll', CounterController.getAll);

export default CounterRouter;