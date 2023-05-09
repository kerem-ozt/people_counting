import UserService from "../services/user.js";

class UserController {
    static async register(req, res) {
    
		try {
			let result = await UserService.register(req);
			
			return res.json({ type: true, data: result.data });
		}
		catch (error) {
			console.log(2);
			return res.json({ type: false, message: error.message });
		}
	}
}

export default UserController;