import CounterService from "../services/counter.js";
class CounterController {

     /**
	 * @route GET /counter/run
	 * @group Counter
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */

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

    /**
        * @route GET /counter/runandsave
        * @group Counter
        * @returns {object} 200 - Success message
        * @returns {Error} default - Unexpected error
     */

    static async runAndSave(req, res) {
        try {
            let result = await CounterService.runAndSave(req);
            if (!result.type) {
                return res.send({type: false, message: result.message});
            }
            return res.send({type: true, data: result.data});
        }
        catch (err) {
            return res.send({type: false, message: err});
        }
    }

    /**
     * @route POST /counter/getAllWithParam
     * @group Counter
     * @param {string} date.query.required - date
     * @param {string} time.query.required - time
     * @returns {object} 200 - Success message
     * @returns {Error} default - Unexpected error
    */

    static async getAllWithParam(req, res) {
        try {
            let result = await CounterService.getAllWithParam(req);
            if (!result.type) {
                return res.send({type: false, message: result.message});
            }
            return res.send({type: true, data: result.data});
        }
        catch (err) {
            return res.send({type: false, message: err});
        }
    }

    /**
     * @route DELETE /counter/delete
     * @group Counter
     * @param {string} date.query.required - YYYY-MM-DD
     * @param {string} time.query.required - HH:MM:SS
     * @returns {object} 200 - Success message
     * @returns {Error} default - Unexpected error
     */

    static async delete(req, res) {
        try {
            let result = await CounterService.delete(req);
            if (!result.type) {
                return res.send({type: false, message: result.message});
            }
            return res.send({type: true, data: result.data});
        }
        catch (err) {
            return res.send({type: false, message: err});
        }
    }

    static async testWithNormalDatabase(req, res) {
        try {
            let result = await CounterService.testWithNormalDatabase(req);
            if (!result.type) {
                return res.send({type: false, message: result.message});
            }
            return res.send({type: true, data: result.data});
        }
        catch (err) {
            return res.send({type: false, message: err});
        }
    }

    static async deleteSession (req, res) {
        try {
            let result = await CounterService.deleteSession(req);
            if (!result.type) {
                return res.send({type: false, message: result.message});
            }
            return res.send({type: true});
        }
        catch (err) {
            return res.send({type: false, message: err});
        }
    }
}

export default CounterController;