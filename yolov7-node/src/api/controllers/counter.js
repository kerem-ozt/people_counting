import CounterService from "../services/counter.js";

class CounterController {

    static async runDetector(req, res) {
        try {
            let result = await CounterService.runDetector(req);
            if (!result.type) {
                return res.send({type: false, message: result.message});
            }
            return res.send({type: true, data: result.data});
        }
        catch (err) {
            return res.send({type: false, message: err});
        }
    }

    static async runDetectorSaveData(req, res) {
        try {
            let result = await CounterService.runDetectorSaveData(req);
            if (!result.type) {
                return res.send({type: false, message: result.message});
            }
            return res.send({type: true, data: result.data});
        }
        catch (err) {
            return res.send({type: false, message: err});
        }
    }

}

export default CounterController;