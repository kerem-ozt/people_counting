import { onnxruntime } from "../../utils/onnxruntime.js";

class CounterService {

    static async runDetector (req) {
        try {
            onnxruntime();
            return {type: true, data: "Detector running"};
        }
        catch (err) {
            return {type: false, message: err};
        }
    }

    static async runDetectorSaveData (req) {
        try {
            let result = await onnxruntime();
            console.log("result:", result);
        }
        catch (err) {
            return {type: false, message: err};
        }
    }

}

export default CounterService;