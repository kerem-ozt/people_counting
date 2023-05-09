import admin from 'firebase-admin'

class UserService {

    static async register (req) {
		
        try {
            const user = {
                email: req.body.email,
                password: req.body.password
            }
            const userResponse = await admin.auth().createUser({
                email: user.email,
                password: user.password,
                emailVerified: false,
                disabled: false
            })
            return {type: true, data: user};
        }
        catch (err) {	
            return {type: false, message: getLanguage(language, 'user_register_fail'), err};
        }
		
    }
}

export default UserService;