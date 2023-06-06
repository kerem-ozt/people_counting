import UserService from "../services/user.js";

/**
 * @typedef User
 * @property {string} email.required
 * @property {string} password.required
 */

class UserController {
    
    /**
	 * @route GET /user/getAll
	 * @group User
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */

    static async getAll(req, res) {
        
        try {
            let result = await UserService.getAll(req);

            if (!result.type){
				return res.json({ type: false, message: result.message });
			}

			return res.json({ type: true, data: result.data });
        }
        catch (error) {
            return res.json({ type: false, message: error.message });
        }

    }

    /**
	 * @route GET /user/get/:uid
	 * @group User
     * @param {string} uid - uid
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */

    static async get(req, res) {

        try {
            let result = await UserService.get(req);

            if (!result.type){
                return res.json({ type: false, message: result.message });
            }

            return res.json({ type: true, data: result.data });
        }
        catch (error) {
            return res.json({ type: false, message: error.message });
        }
    }

    /**
     * @route POST /user/register
     * @group User
     * @returns {object} 200 - Success message
     * @returns {Error} default - Unexpected error
     * @param {User.model} body.body
    */

    static async register(req, res) {
    
		try {
			let result = await UserService.register(req);
			
            if (!result.type){
				return res.json({ type: false, message: result.message });
			}

			return res.json({ type: true, data: result.data });
		}
		catch (error) {
			return res.json({ type: false, message: error.message });
		}
	}

    /**
     * @route DELETE /user/delete/:uid
     * @group User
     * @returns {object} 200 - Success message
     * @returns {Error} default - Unexpected error
     */

    static async delete(req, res) {

		try {
			let result = await UserService.delete(req);
			if (!result.type) {
				return res.send({type: false, message: result.message});
			}
			return res.json({ type: true, message: result.data });
        }
		catch (error) {
			return res.json({ type: false, message: error.message });
		}
	}

    /**
     * @route PUT /user/update/:uid
     * @group User
     * @returns {object} 200 - Success message
     * @returns {Error} default - Unexpected error
     * @param {User.model} body.body
     */

    static async update(req, res) {

        try {
            let result = await UserService.update(req);
            if (!result.type) {
                return res.send({type: false, message: result.message});
            }
            return res.json({ type: true, message: result.data });
        }
        catch (error) {
            return res.json({ type: false, message: error.message });
        }
    }

    /**
     * @route POST /user/login
     * @group User
     * @returns {object} 200 - Success message
     * @returns {Error} default - Unexpected error
     * @param {User.model} body.body
     */

    static async login(req, res) {

        try {
            let result = await UserService.login(req);
            if (!result.type) {
                return res.send({type: false, message: result.message});
            }
            return res.json({ type: true, message: result.data });
        }
        catch (error) {
            return res.json({ type: false, message: error.message });
        }
    }

    /**
     * @route POST /user/logout
     * @group User
     * @returns {object} 200 - Success message
     * @returns {Error} default - Unexpected error
    */

    static async logout(req, res) {

        try{
            
            let result = await UserService.logout(req);
            if (!result.type) {
                return res.send({type: false, message: result.message});
            }
            return res.json({ type: true, message: result.data });
        }
        catch (error) {
            return res.json({ type: false, message: error.message });
        }
    }
}

export default UserController;