import UserService from "../services/user.js";

class UserController {

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